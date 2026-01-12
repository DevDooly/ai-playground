import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Alert, AlertIcon, VStack, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

interface ExchangeRates {
  [key: string]: number;
}

const ExchangeRate: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with a secure environment variable. A free API key is usually not required for exchangerate.host for basic usage.
  // However, some advanced features or higher request limits might require one.
  const EXCHANGE_RATE_API_KEY = 'YOUR_EXCHANGE_RATE_API_KEY'; 
  const BASE_CURRENCY = 'KRW'; // Base currency
  const SYMBOLS = 'USD,EUR,JPY,GBP,CNY'; // Currencies to fetch

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        setError(null);
        // Exchangerate.host often works without an API key for basic 'latest' endpoint,
        // but adding `access_key` parameter for completeness if needed for other features or rate limits.
        const response = await fetch(
          \`https://api.exchangerate.host/latest?base=${BASE_CURRENCY}&symbols=${SYMBOLS}\${EXCHANGE_RATE_API_KEY ? \`&access_key=\${EXCHANGE_RATE_API_KEY}\` : ''}\`
        );
        const data = await response.json();

        if (!response.ok || data.success === false) {
          throw new Error(data.error?.info || 'Failed to fetch exchange rates');
        }

        setExchangeRates(data.rates);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, [BASE_CURRENCY, SYMBOLS, EXCHANGE_RATE_API_KEY]);

  if (loading) {
    return (
      <Box p={4}>
        <Spinner size="xl" />
        <Text mt={2}>환율 정보를 불러오는 중...</Text>
      </Box>
    );
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

  if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
    return (
      <Box p={4}>
        <Text>환율 정보를 찾을 수 없습니다.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="xl">환율 정보 (기준: {BASE_CURRENCY})</Heading>
        {Object.entries(exchangeRates).map(([currency, rate]) => (
          <Stat key={currency}>
            <StatLabel>{currency}</StatLabel>
            <StatNumber>{rate.toFixed(2)}</StatNumber>
          </Stat>
        ))}
      </VStack>
    </Box>
  );
};

export default ExchangeRate;
