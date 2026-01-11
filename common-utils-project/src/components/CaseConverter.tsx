import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Textarea,
  VStack,
  useClipboard,
  IconButton,
  Tooltip,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { CopyIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const CaseConverter: React.FC = () => {
  const [input, setInput] = useState('exampleInputText helloWorld Example_String-With-Hyphens');
  const [output, setOutput] = useState('');
  const { onCopy, hasCopied } = useClipboard(output);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    // Reset output when input changes
    setOutput('');
  };

  const toUpperCase = () => setOutput(input.toUpperCase());
  const toLowerCase = () => setOutput(input.toLowerCase());
  const toCamelCase = () => {
    setOutput(
      input
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/[\s_-]+/g, '')
    );
  };
  const toPascalCase = () => {
      setOutput(
          input
              .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
              .replace(/[\s_-]+/g, '')
      )
  }
  const toSnakeCase = () => {
    const result = input
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
    setOutput(result);
  };
  const toKebabCase = () => {
    const result = input
      .replace(/([a-z\d])([A-Z])/g, '$1-$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
    setOutput(result);
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch" mb={8}>
        <Heading as="h2" size="xl">
          Case Converter
        </Heading>
        <Text color="gray.500">
          Easily convert text between different case formats.
        </Text>
      </VStack>

      <Grid templateColumns={{ base: '1fr', md: '1fr auto 1fr' }} gap={6} align="center">
        <GridItem>
          <Heading as="h3" size="md" mb={2}>
            Input
          </Heading>
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Enter text here..."
            size="lg"
            height="250px"
            boxShadow="md"
            focusBorderColor="blue.500"
          />
        </GridItem>

        <GridItem>
          <VStack spacing={4} mt={8}>
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="blue" onClick={toUpperCase}>
              UPPERCASE
            </Button>
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="blue" onClick={toLowerCase}>
              lowercase
            </Button>
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="blue" onClick={toCamelCase}>
              camelCase
            </Button>
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="blue" onClick={toPascalCase}>
              PascalCase
            </Button>
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="blue" onClick={toSnakeCase}>
              snake_case
            </Button>
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="blue" onClick={toKebabCase}>
              kebab-case
            </Button>
          </VStack>
        </GridItem>

        <GridItem>
          <Heading as="h3" size="md" mb={2}>
            Output
          </Heading>
          <Box position="relative">
            <Textarea
              value={output}
              isReadOnly
              placeholder="Output will appear here..."
              size="lg"
              height="250px"
              boxShadow="md"
              bg="gray.50"
            />
            <Tooltip label={hasCopied ? 'Copied!' : 'Copy to clipboard'} closeOnClick={false}>
              <IconButton
                aria-label="Copy to clipboard"
                icon={<CopyIcon />}
                size="sm"
                position="absolute"
                top="0.5rem"
                right="0.5rem"
                onClick={onCopy}
                variant="ghost"
                isDisabled={!output}
              />
            </Tooltip>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CaseConverter;
