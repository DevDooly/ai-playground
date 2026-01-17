import os
import logging
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters
import yfinance as yf
import pandas as pd
import httpx
from urllib.parse import quote

ticker_cache = {}

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("bot.log"),
        logging.StreamHandler() # 터미널에도 로그를 출력하려면 이 줄을 유지
    ]
)
logger = logging.getLogger(__name__)

# .env 파일에서 환경 변수 로드
# 스크립트 파일의 절대 경로를 기준으로 .env 파일의 경로를 지정
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
    logger.info(".env 파일을 로드했습니다.")
else:
    logger.warning(".env 파일을 찾을 수 없습니다. 환경 변수를 직접 설정해야 합니다.")

# --- 명령어 핸들러 함수 ---

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/start 명령어 응답"""
    user = update.effective_user
    await update.message.reply_html(
        f"안녕하세요, {user.mention_html()}님!\n"
        f"저는 증시 정보를 알려주는 봇입니다. /help 명령어로 사용법을 확인하세요."
    )

# --- 명령어 핸들러 함수 ---

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/help 명령어 응답"""
    help_text = """
    **사용 가능한 명령어 목록:**
    /start, /시작 - 봇 시작
    /help, /도움말 - 도움말 보기
    /sp500, /에스엔피500 - S&P 500 지수 조회
    /nasdaq, /나스닥 - 나스닥 지수 조회
    /vix, /빅스 - VIX 지수 조회
    /exchange, /환율 - 환율 정보 조회 (USD/KRW)
    /stock, /주식 <종목명 또는 티커> - 개별 종목 조회
    
    *추가될 기능:*
    - 정기 알림 기능
    - 사용자 포트폴리오 관리
    """
    await update.message.reply_text(help_text, parse_mode='Markdown')

# --- 금융 데이터 검색 및 조회 함수 ---

async def find_ticker(query: str) -> dict | None:
    """입력된 쿼리(종목명 또는 티커)로 가장 적합한 티커 심볼을 찾습니다."""
    if query in ticker_cache:
        logger.info(f"Found ticker in cache for query: {query}")
        return ticker_cache[query]

    logger.info(f"Searching ticker for query: {query}")
    encoded_query = quote(query)
    url = f"https://query1.finance.yahoo.com/v1/finance/search?q={encoded_query}"
    
    # 429 Too Many Requests 방지를 위해 User-Agent 설정
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)
            response.raise_for_status()
            data = response.json()

        quotes = data.get('quotes', [])
        if not quotes:
            return None

        # 가장 관련성 높은 결과 선택 (주식 우선, 없으면 다음)
        best_result = next((q for q in quotes if q.get('quoteType') == 'EQUITY'), None)
        if not best_result:
            best_result = next((q for q in quotes if q.get('symbol')), None)
        
        if not best_result:
            return None

        symbol = best_result.get('symbol')
        long_name = best_result.get('longname', best_result.get('shortname', ''))
        
        result = {"symbol": symbol, "name": long_name}
        ticker_cache[query] = result  # 캐시에 저장
        logger.info(f"Found ticker: {symbol} for query: {query}")
        return result

    except Exception as e:
        logger.error(f"Error finding ticker for {query}: {e}")
        return None

async def fetch_index_data(update: Update, context: ContextTypes.DEFAULT_TYPE, ticker_symbol: str, index_name: str) -> None:
    """공통 인덱스 데이터 조회 및 응답 함수"""
    logger.info(f"Fetching {index_name} data for {update.effective_user.id}")
    data = await get_stock_info(ticker_symbol)

    if data.get("error"):
        await update.message.reply_text(data["error"])
        return

    message = format_stock_data(data)
    await update.message.reply_text(message, parse_mode='Markdown')

async def sp500_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/sp500 명령어 응답"""
    await fetch_index_data(update, context, "^GSPC", "S&P 500")

async def nasdaq_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/nasdaq 명령어 응답"""
    await fetch_index_data(update, context, "^IXIC", "Nasdaq")

async def vix_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/vix 명령어 응답"""
    await fetch_index_data(update, context, "^VIX", "VIX")

async def stock_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/stock <종목명 또는 티커> 명령어 응답"""
    if not context.args:
        await update.message.reply_text("사용법: `/stock <종목명 또는 티커>`", parse_mode='Markdown')
        return

    query = ' '.join(context.args)
    sent_message = await update.message.reply_text(f"'{query}'에 대한 정보를 검색 중입니다...")

    ticker_info = await find_ticker(query)

    if not ticker_info:
        await sent_message.edit_text(f"'{query}'에 해당하는 종목을 찾을 수 없습니다. 종목명이나 티커를 확인해주세요.")
        return

    ticker_symbol = ticker_info['symbol']
    logger.info(f"Fetching stock data for {ticker_symbol} ({query}) by {update.effective_user.id}")
    
    data = await get_stock_info(ticker_symbol)

    if data.get("error"):
        await sent_message.edit_text(data["error"])
        return
    
    data['shortName'] = ticker_info.get('name', data.get('shortName'))

    message = format_stock_data(data)
    await sent_message.edit_text(message, parse_mode='Markdown')

async def exchange_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/exchange 명령어 응답 (USD/KRW)"""
    logger.info(f"Fetching exchange rate for {update.effective_user.id}")
    data = await get_stock_info("KRW=X") # USD/KRW 티커

    if data.get("error"):
        await update.message.reply_text(data["error"])
        return

    message = format_exchange_rate_data(data)
    await update.message.reply_text(message, parse_mode='Markdown')

def format_exchange_rate_data(data: dict) -> str:
    """환율 데이터를 보기 좋은 문자열로 포매팅합니다."""
    short_name = data.get("shortName", "USD/KRW")
    current_price = data.get("currentPrice")
    change = data.get("change")
    change_percent = data.get("changePercent")
    
    price_str = f"{current_price:,.2f}" if current_price is not None else "N/A"
    change_str = ""
    if change is not None and change_percent is not None:
        sign = "+" if change >= 0 else ""
        change_str = f" ({sign}{change:,.2f} / {sign}{change_percent:,.2f}%)"

    open_price = data.get('open')
    day_high = data.get('dayHigh')
    day_low = data.get('dayLow')

    message = f"*{short_name} 환율*\n" \
              f"현재가: {price_str}원{change_str}\n" \
              f"시가: {open_price:,.2f}원\n" if open_price is not None else "" \
              f"고가: {day_high:,.2f}원\n" if day_high is not None else "" \
              f"저가: {day_low:,.2f}원" if day_low is not None else ""
    return message

def format_stock_data(data: dict) -> str:
    """주식 데이터를 보기 좋은 문자열로 포매팅합니다."""
    short_name = data.get("shortName", "N/A")
    current_price = data.get("currentPrice")
    change = data.get("change")
    change_percent = data.get("changePercent")
    currency = data.get("currency", "")

    price_str = f"{current_price:,.2f} {currency}" if current_price is not None else "N/A"
    change_str = ""
    if change is not None and change_percent is not None:
        sign = "+" if change >= 0 else ""
        change_str = f" ({sign}{change:,.2f} / {sign}{change_percent:,.2f}%)"

    open_price = data.get('open')
    day_high = data.get('dayHigh')
    day_low = data.get('dayLow')
    volume = data.get('volume')

    message = f"*{short_name}*\n" \
              f"현재가: {price_str}{change_str}\n"
    
    if open_price is not None:
        message += f"시가: {open_price:,.2f} {currency}\n"
    if day_high is not None:
        message += f"고가: {day_high:,.2f} {currency}\n"
    if day_low is not None:
        message += f"저가: {day_low:,.2f} {currency}\n"
    if volume is not None:
        message += f"거래량: {volume:,}"
    
    return message.strip()

# --- 금융 데이터 조회 함수 ---
async def get_stock_info(ticker_symbol: str) -> dict:
    """
    yfinance를 사용하여 특정 티커 심볼의 현재 주식 정보를 가져옵니다.
    history()를 사용하여 현재가를 더 안정적으로 가져옵니다.
    """
    ticker = yf.Ticker(ticker_symbol)
    try:
        info = ticker.info
        
        # history()는 더 신뢰할 수 있는 가격 소스(특히 지수의 경우)
        hist = ticker.history(period="5d")
        
        current_price = None
        if not hist.empty:
            # 마지막 거래일의 종가를 현재가로 사용
            current_price = hist['Close'].iloc[-1]
        
        # Fallback in case history is empty or fails
        if current_price is None:
            current_price = info.get('currentPrice') or info.get('regularMarketPrice')

        previous_close = info.get('previousClose')
        # Fallback for previous_close
        if previous_close is None and len(hist) > 1:
            previous_close = hist['Close'].iloc[-2]
            
        open_price = info.get('open')
        day_high = info.get('dayHigh')
        day_low = info.get('dayLow')
        volume = info.get('volume')
        short_name = info.get('shortName', ticker_symbol)

        # 등락률 계산
        change = None
        change_percent = None
        if current_price and previous_close:
            change = current_price - previous_close
            if previous_close != 0:
                change_percent = (change / previous_close) * 100

        return {
            "shortName": short_name,
            "currentPrice": current_price,
            "previousClose": previous_close,
            "open": open_price,
            "dayHigh": day_high,
            "dayLow": day_low,
            "volume": volume,
            "change": change,
            "changePercent": change_percent,
            "currency": info.get('currency')
        }
    except Exception as e:
        logger.error(f"Error fetching data for {ticker_symbol}: {e}")
        return {"error": f"'{ticker_symbol}'에 대한 정보를 가져오는 데 실패했습니다. 티커 심볼을 확인해주세요."}


# --- 한글 명령어 라우터 ---
async def korean_command_router(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """한글 명령어를 감지하고 적절한 함수로 라우팅합니다."""
    text = update.message.text
    command = text.split()[0][1:]  # 명령어 부분만 추출 (예: /주식)

    # 한글 명령어와 함수를 매핑
    command_map = {
        "시작": start,
        "도움말": help_command,
        "에스엔피500": sp500_command,
        "나스닥": nasdaq_command,
        "빅스": vix_command,
        "환율": exchange_command,
        "주식": stock_command,
    }

    if command in command_map:
        # '/주식' 명령어의 경우, 인자를 context.args에 저장
        if command == "주식":
            context.args = text.split()[1:]
        
        # 매핑된 함수 호출
        await command_map[command](update, context)

# --- 봇의 메인 실행 함수 ---

def main() -> None:
    """봇을 시작하고 실행합니다."""
    
    # 텔레그램 토큰 가져오기
    token = os.getenv("TELEGRAM_TOKEN")
    if not token:
        logger.error("텔레그램 토큰이 .env 파일에 설정되지 않았습니다.")
        return

    # 애플리케이션 생성
    application = Application.builder().token(token).build()

    # 영어 명령어 핸들러 등록
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("sp500", sp500_command))
    application.add_handler(CommandHandler("nasdaq", nasdaq_command))
    application.add_handler(CommandHandler("vix", vix_command))
    application.add_handler(CommandHandler("stock", stock_command))
    application.add_handler(CommandHandler("exchange", exchange_command))

    # 한글 명령어 핸들러 등록
    korean_commands = ["시작", "도움말", "에스엔피500", "나스닥", "빅스", "환율", "주식"]
    regex_pattern = r'^/(' + '|'.join(korean_commands) + r')'
    application.add_handler(MessageHandler(filters.Regex(regex_pattern), korean_command_router))

    # 봇 실행 (폴링 방식)
    logger.info("봇을 시작합니다...")
    application.run_polling()

if __name__ == '__main__':
    main()