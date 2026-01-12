import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Alert, AlertIcon, VStack, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { KOREA_EXIM_API_KEY } from '../config'; // Assuming config.ts exports KOREA_EXIM_API_KEY

interface ExchangeRateData {
  cur_unit: string;
  cur_nm: string;
  ttb: string; // TTB (Telegraphic Transfer Buying) rate
  tts: string; // TTS (Telegraphic Transfer Selling) rate
  deal_bas_r: string; // Deal Base Rate
  bkpr: string; // Base Rate for book keeping
  yy_efee_r: string; // Yearly Effective Interest Rate
  ten_dd_efee_r: string; // Ten-day Effective Interest Rate
  kftc_bkpr: string; // KFTC Base Rate for book keeping
  kftc_deal_bas_r: string; // KFTC Deal Base Rate
  result: number; // 1 for success, 0 for failure
}

const ExchangeRate: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRateData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        setError(null);

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        const searchDate = `${year}${month}${day}`;

        const response = await fetch(
          `https://oapi.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${KOREA_EXIM_API_KEY}&searchdate=${searchDate}&data=AP01`
        );
        const data: ExchangeRateData[] = await response.json();

        // The API returns an array, and 'result' property on the first item indicates success/failure.
        // If result is 1, it's successful. If 0, it's an error.
        if (!response.ok || (data.length > 0 && data[0].result === 0)) {
          throw new Error(data.length > 0 ? `API Error: ${JSON.stringify(data[0])}` : 'Failed to fetch exchange rates');
        }
        
        // Filter out currencies that are not relevant or have issues (e.g., JPY per 100, so converting it to 1 JPY)
        const filteredRates = data.map(rate => {
          if (rate.cur_unit === 'JPY(100)') {
            return { ...rate, cur_unit: 'JPY', deal_bas_r: (parseFloat(rate.deal_bas_r.replace(',', '')) / 100).toFixed(2) };
          }
          return { ...rate, deal_bas_r: rate.deal_bas_r.replace(',', '') }; // Remove comma for parsing
        });

        const targetCurrencies = ['USD', 'JPY', 'EUR'];
        const finalRates = filteredRates.filter(rate => targetCurrencies.includes(rate.cur_unit));
        setExchangeRates(finalRates);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []); // Empty dependency array as searchDate is generated inside and KOREA_EXIM_API_KEY is constant

  if (loading) {
    return (
      <Box p={4}>
        <Spinner size="xl" />
        <Text mt={2}>환율 정보를 불러오는 중...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert status="error">
          <AlertIcon />
          오류: {error}
        </Alert>
      </Box>
    );
  }

  if (!exchangeRates || exchangeRates.length === 0) {
    return (
      <Box p={4}>
        <Text>환율 정보를 찾을 수 없습니다.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="xl">환율 정보 (기준: KRW)</Heading>
        {exchangeRates.map((rate, index) => (
          <Stat key={index}>
            <StatLabel>{rate.cur_unit} ({rate.cur_nm})</StatLabel>
            <StatNumber>{rate.deal_bas_r}</StatNumber>
          </Stat>
        ))}
      </VStack>
    </Box>
  );
};

export default ExchangeRate;
