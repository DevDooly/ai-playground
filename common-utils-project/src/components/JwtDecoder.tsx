import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Textarea,
  VStack,
  Text,
  Alert,
  AlertIcon,
  Code,
  HStack,
  useClipboard,
  Tooltip,
  IconButton
} from '@chakra-ui/react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { CopyIcon } from '@chakra-ui/icons';

const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<object | null>(null);
  const [payload, setPayload] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { onCopy: onCopyHeader, hasCopied: hasCopiedHeader } = useClipboard(header ? JSON.stringify(header, null, 2) : '');
  const { onCopy: onCopyPayload, hasCopied: hasCopiedPayload } = useClipboard(payload ? JSON.stringify(payload, null, 2) : '');

  useEffect(() => {
    if (token.trim() === '') {
      setHeader(null);
      setPayload(null);
      setError(null);
      return;
    }

    try {
      const decodedHeader = jwtDecode(token, { header: true });
      const decodedPayload = jwtDecode<JwtPayload>(token);
      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError(null);
    } catch (e) {
      setHeader(null);
      setPayload(null);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred while decoding the token.');
      }
    }
  }, [token]);

  return (
    <Box>
      <Heading as="h2" size="xl" mb={8}>
        JWT Decoder
      </Heading>
      <VStack spacing={6} align="stretch">
        <Textarea
          placeholder="Paste your JWT here..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          size="lg"
          height="150px"
          fontFamily="mono"
        />
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <HStack spacing={6} align="start">
          <Box flex="1">
            <HStack justify="space-between" mb={2}>
              <Heading as="h3" size="md">Decoded Header</Heading>
              <Tooltip label={hasCopiedHeader ? 'Copied!' : 'Copy'} closeOnClick={false}>
                <IconButton
                  aria-label="Copy header"
                  icon={<CopyIcon />}
                  size="sm"
                  onClick={onCopyHeader}
                  variant="ghost"
                  isDisabled={!header}
                />
              </Tooltip>
            </HStack>
            <Code as="pre" p={4} borderRadius="md" whiteSpace="pre-wrap" width="100%" bg="gray.50" minH="150px">
              {header ? JSON.stringify(header, null, 2) : '...'}
            </Code>
          </Box>
          <Box flex="1">
            <HStack justify="space-between" mb={2}>
              <Heading as="h3" size="md">Decoded Payload</Heading>
               <Tooltip label={hasCopiedPayload ? 'Copied!' : 'Copy'} closeOnClick={false}>
                <IconButton
                  aria-label="Copy payload"
                  icon={<CopyIcon />}
                  size="sm"
                  onClick={onCopyPayload}
                  variant="ghost"
                  isDisabled={!payload}
                />
              </Tooltip>
            </HStack>
            <Code as="pre" p={4} borderRadius="md" whiteSpace="pre-wrap" width="100%" bg="gray.50" minH="150px">
              {payload ? JSON.stringify(payload, null, 2) : '...'}
            </Code>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default JwtDecoder;
