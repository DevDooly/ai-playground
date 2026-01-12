import React, { useState } from 'react';
import {
  Box,
  Heading,
  Textarea,
  Button,
  VStack,
  HStack,
  useClipboard,
  IconButton,
  Tooltip,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { Base64 } from 'js-base64';

const Base64Converter: React.FC = () => {
  const [plainText, setPlainText] = useState('Hello, world!');
  const [base64Text, setBase64Text] = useState('SGVsbG8sIHdvcmxkIQ==');
  const { onCopy: onCopyPlainText, hasCopied: hasCopiedPlainText } = useClipboard(plainText);
  const { onCopy: onCopyBase64, hasCopied: hasCopiedBase64 } = useClipboard(base64Text);

  const handleEncode = () => {
    try {
      setBase64Text(Base64.encode(plainText));
    } catch {
      setBase64Text('Error encoding text.');
    }
  };

  const handleDecode = () => {
    try {
      setPlainText(Base64.decode(base64Text));
    } catch {
      setPlainText('Error decoding text.');
    }
  };

  return (
    <Box>
      <Heading as="h2" size="xl" mb={8}>
        Base64 Encoder / Decoder
      </Heading>
      <Grid templateColumns={{ base: '1fr', md: '1fr auto 1fr' }} gap={6} alignItems="center">
        <GridItem>
          <HStack mb={2} justify="space-between">
            <Heading as="h3" size="md">
              Plain Text
            </Heading>
            <Tooltip label={hasCopiedPlainText ? 'Copied!' : 'Copy'} closeOnClick={false}>
              <IconButton
                aria-label="Copy plain text"
                icon={<CopyIcon />}
                size="sm"
                onClick={onCopyPlainText}
                variant="ghost"
              />
            </Tooltip>
          </HStack>
          <Textarea
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            placeholder="Enter plain text..."
            size="lg"
            height="250px"
          />
        </GridItem>

        <GridItem>
          <VStack spacing={4} mt={8}>
            <Button onClick={handleEncode} colorScheme="blue">
              Encode &gt;&gt;
            </Button>
            <Button onClick={handleDecode} colorScheme="green">
              &lt;&lt; Decode
            </Button>
          </VStack>
        </GridItem>

        <GridItem>
          <HStack mb={2} justify="space-between">
            <Heading as="h3" size="md">
              Base64
            </Heading>
            <Tooltip label={hasCopiedBase64 ? 'Copied!' : 'Copy'} closeOnClick={false}>
              <IconButton
                aria-label="Copy Base64 text"
                icon={<CopyIcon />}
                size="sm"
                onClick={onCopyBase64}
                variant="ghost"
              />
            </Tooltip>
          </HStack>
          <Textarea
            value={base64Text}
            onChange={(e) => setBase64Text(e.target.value)}
            placeholder="Enter Base64 text..."
            size="lg"
            height="250px"
            fontFamily="mono"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Base64Converter;
