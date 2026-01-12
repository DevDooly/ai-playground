import React, { useState, useMemo } from 'react';
import {
  Box,
  Heading,
  Textarea,
  VStack,
  Alert,
  AlertIcon,
  Code,
  HStack,
  useClipboard,
  Tooltip,
  IconButton
} from '@chakra-ui/react';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { CopyIcon } from '@chakra-ui/icons';

const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState('');

  const { header, payload, error } = useMemo(() => {
    if (token.trim() === '') {
      return { header: null, payload: null, error: null };
    }
    try {
      const decodedHeader = jwtDecode(token, { header: true });
      const decodedPayload = jwtDecode<JwtPayload>(token);
      return { header: decodedHeader, payload: decodedPayload, error: null };
    } catch (e) {
      if (e instanceof Error) {
        return { header: null, payload: null, error: e.message };
      }
      return { header: null, payload: null, error: 'An unknown error occurred while decoding the token.' };
    }
  }, [token]);

  const { onCopy: onCopyHeader, hasCopied: hasCopiedHeader } = useClipboard(header ? JSON.stringify(header, null, 2) : '');
  const { onCopy: onCopyPayload, hasCopied: hasCopiedPayload } = useClipboard(payload ? JSON.stringify(payload, null, 2) : '');

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
