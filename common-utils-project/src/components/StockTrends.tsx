import React, { useState, useEffect } from 'react';
import { Box, Text, Spinner, Alert, AlertIcon, VStack, Heading, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import { ALPHA_VANTAGE_API_KEY } from '../config'; // Import API key from config file

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

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

const StockTrends: React.FC = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Removed lastUpdatedClientTime state

  // Remember to replace 'YOUR_ALPHA_VANTAGE_API_KEY' in src/config.ts with your actual API key.
  // The src/config.ts file is gitignored for security.
  const SYMBOL = 'QQQ'; // Example: NASDAQ 100 ETF

  useEffect(() => {
    const fetchStockData = async () => {
      let data: any; // Declare data outside try block
      // Removed fetchedTimestamp variable
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        const cachedData = localStorage.getItem(`stockData_${SYMBOL}`);
        if (cachedData) {
          const { data: storedData, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setStockData(storedData['Global Quote']); // Assuming 'Global Quote' is the actual data part
            setLoading(false);
            return; // Use cached data
          }
        }

        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${SYMBOL}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json(); // Assign data here
        // fetchedTimestamp = Date.now(); // Data was just fetched - no longer needed for UI

        if (data['Error Message']) {
          throw new Error(data['Error Message']);
        }
        if (data['Note']) {
            setError(data['Note']);
            setLoading(false);
            return;
        }
        // Handle Alpha Vantage rate limit message
        if (data['Information']) {
            setError(data['Information']);
            setLoading(false);
            return;
        }

        if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
            setStockData(data['Global Quote']);
            // setLastUpdatedClientTime(new Date(fetchedTimestamp).toLocaleString()); // Removed
            // Store new data in cache
            localStorage.setItem(`stockData_${SYMBOL}`, JSON.stringify({ data: data, timestamp: Date.now() })); // Keep caching
        } else {
            setError('No Global Quote data found in API response. This might be due to an invalid symbol or API issues.');
        }
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

        {stockData['07. latest trading day'] && (
          <Text fontSize="sm" color="gray.500">
            데이터 출처: Alpha Vantage | 최종 거래일: {stockData['07. latest trading day']}
            <br />
            <Text as="span" fontStyle="italic" fontSize="xs">
              (Alpha Vantage 'Global Quote' API는 거래일만 제공하며, 정확한 시각은 제공하지 않습니다.)
            </Text>
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default StockTrends;
