import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Textarea,
  VStack,
  HStack,
  useClipboard,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

const CaseConverter: React.FC = () => {
  const [input, setInput] = useState('exampleInputText helloWorld Example_String-With-Hyphens');
  const [output, setOutput] = useState('');
  const { onCopy, hasCopied } = useClipboard(output);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const toUpperCase = () => setOutput(input.toUpperCase());
  const toLowerCase = () => setOutput(input.toLowerCase());
  const toCamelCase = () => {
    setOutput(
      input
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, '')
    );
  };
  const toSnakeCase = () => {
    const result = input
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1_$2')
      .replace(/\s+/g, '_')
      .toLowerCase();
    setOutput(result);
  };
  const toKebabCase = () => {
    const result = input
      .replace(/([a-z\d])([A-Z])/g, '$1-$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();
    setOutput(result);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h2" size="xl">
        Case Converter
      </Heading>
      <Textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Enter text here..."
        size="lg"
        height="200px"
      />
      <HStack spacing={4} wrap="wrap">
        <Button colorScheme="teal" onClick={toUpperCase}>
          UPPERCASE
        </Button>
        <Button colorScheme="teal" onClick={toLowerCase}>
          lowercase
        </Button>
        <Button colorScheme="teal" onClick={toCamelCase}>
          camelCase
        </Button>
        <Button colorScheme="teal" onClick={toSnakeCase}>
          snake_case
        </Button>
        <Button colorScheme="teal" onClick={toKebabCase}>
          kebab-case
        </Button>
      </HStack>
      <Box position="relative">
        <Textarea
          value={output}
          isReadOnly
          placeholder="Output..."
          size="lg"
          height="200px"
        />
        <Tooltip label={hasCopied ? 'Copied!' : 'Copy'} closeOnClick={false}>
          <IconButton
            aria-label="Copy to clipboard"
            icon={<CopyIcon />}
            size="sm"
            position="absolute"
            top="0.5rem"
            right="0.5rem"
            onClick={onCopy}
          />
        </Tooltip>
      </Box>
    </VStack>
  );
};

export default CaseConverter;
