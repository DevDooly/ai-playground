import React, { useState, useEffect } from 'react';
import { Box, Text, Spinner, Alert, AlertIcon, VStack, Heading, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';

interface StockData {
  '01. symbol': string;
  '02. open': string;
  '03. high': string;
  '04. low': string;
  '05. price': string;
  '06. volume': string;
  '07. latest trading day': string;
  '08. previous close': string;
  '09. change': string;
  '10. change percent': string;
}

const StockTrends: React.FC = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with a secure environment variable
  const ALPHA_VANTAGE_API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY'; 
  const SYMBOL = 'AAPL'; // Example: Apple Inc.

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${SYMBOL}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        const data = await response.json();

        if (data['Error Message']) {
          throw new Error(data['Error Message']);
        }
        if (data['Note']) {
            // API rate limit or other messages
            setError(data['Note']);
            setLoading(false);
            return;
        }

        setStockData(data['Global Quote']);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [SYMBOL, ALPHA_VANTAGE_API_KEY]);

  if (loading) {
    return (
      <Box p={4}>
        <Spinner size="xl" />
        <Text mt={2}>Loading stock data...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert status="error">
          <AlertIcon />
          Error: {error}
        </Alert>
      </Box>
    );
  }

  if (!stockData) {
    return (
      <Box p={4}>
        <Text>No stock data available.</Text>
      </Box>
    );
  }

  const change = parseFloat(stockData['09. change']);
  const changePercent = parseFloat(stockData['10. change percent']);
  const isPositive = change >= 0;

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="xl">
          Stock Trend: {stockData['01. symbol']}
        </Heading>
        <Stat>
          <StatLabel>Current Price</StatLabel>
          <StatNumber>{parseFloat(stockData['05. price']).toFixed(2)} USD</StatNumber>
          <StatHelpText>
            <StatArrow type={isPositive ? 'increase' : 'decrease'} />
            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Open</StatLabel>
          <StatNumber>{parseFloat(stockData['02. open']).toFixed(2)}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>High</StatLabel>
          <StatNumber>{parseFloat(stockData['03. high']).toFixed(2)}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Low</StatLabel>
          <StatNumber>{parseFloat(stockData['04. low']).toFixed(2)}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Volume</StatLabel>
          <StatNumber>{parseInt(stockData['06. volume']).toLocaleString()}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Previous Close</StatLabel>
          <StatNumber>{parseFloat(stockData['08. previous close']).toFixed(2)}</StatNumber>
        </Stat>

        <Text fontSize="sm" color="gray.500">
          Last updated: {stockData['07. latest trading day']}
        </Text>
      </VStack>
    </Box>
  );
};

export default StockTrends;
