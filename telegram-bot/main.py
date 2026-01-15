import os
import logging
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("telegram-bot/bot.log"),
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

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/help 명령어 응답"""
    help_text = """
    **사용 가능한 명령어 목록:**
    /start - 봇 시작
    /help - 도움말 보기
    
    *추가될 기능:*
    `/sp500` - S&P 500 지수 조회
    `/nasdaq` - 나스닥 지수 조회
    `/vix` - VIX 지수 조회
    `/exchange` - 환율 정보 조회
    `/stock <티커>` - 개별 종목 조회
    """
    await update.message.reply_text(help_text, parse_mode='Markdown')

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

    # 명령어 핸들러 등록
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))

    # 봇 실행 (폴링 방식)
    logger.info("봇을 시작합니다...")
    application.run_polling()

if __name__ == '__main__':
    main()
