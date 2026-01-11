import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Textarea,
  VStack,
  Button,
  Grid,
  GridItem,
  Text,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  useClipboard,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

const VimCheatsheet = () => {
  const initialText = `apple\nbanana\norange\ngrape\napple\nkiwi\nbanana\nstrawberry\npineapple\napple`;
  const [inputText, setInputText] = useState(initialText);
  const [outputText, setOutputText] = useState(initialText);
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const { onCopy, hasCopied } = useClipboard(outputText);

  useEffect(() => {
    setOutputText(inputText);
  }, [inputText]);

  const handleSort = () => {
    const lines = outputText.split('\n');
    setOutputText(lines.sort().join('\n'));
  };

  const handleUnique = () => {
    const lines = outputText.split('\n');
    setOutputText([...new Set(lines)].join('\n'));
  };

  const handleGlobal = () => {
    const lines = outputText.split('\n');
    const filteredLines = lines.filter(line => line.includes(searchText));
    setOutputText(filteredLines.join('\n'));
  };

  const handleVGlobal = () => {
    const lines = outputText.split('\n');
    const filteredLines = lines.filter(line => !line.includes(searchText));
    setOutputText(filteredLines.join('\n'));
  };

  const handleSubstitute = () => {
    if (!searchText) return;
    const lines = outputText.split('\n');
    const newLines = lines.map(line => line.replace(new RegExp(searchText, 'g'), replaceText));
    setOutputText(newLines.join('\n'));
  };
  
  const reset = () => {
      setOutputText(inputText)
  }

  return (
    <Box>
      <VStack spacing={4} align="stretch" mb={8}>
        <Heading as="h2" size="xl">
          Vim Cheatsheet
        </Heading>
        <Text color="gray.500">
          Test common Vim-like text manipulations. The operations are chained on the output.
        </Text>
      </VStack>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
        <GridItem>
          <Heading as="h3" size="md" mb={2}>
            Input
          </Heading>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text here..."
            size="lg"
            height="300px"
            boxShadow="md"
            focusBorderColor="blue.500"
          />
        </GridItem>
        <GridItem>
          <HStack mb={2} justify="space-between">
            <Heading as="h3" size="md">
              Output
            </Heading>
            <Tooltip label={hasCopied ? 'Copied!' : 'Copy to clipboard'} closeOnClick={false}>
              <IconButton
                aria-label="Copy to clipboard"
                icon={<CopyIcon />}
                size="sm"
                onClick={onCopy}
                variant="ghost"
                isDisabled={!outputText}
              />
            </Tooltip>
          </HStack>
          <Textarea
            value={outputText}
            isReadOnly
            placeholder="Output will appear here..."
            size="lg"
            height="300px"
            boxShadow="md"
            bg="gray.50"
          />
        </GridItem>
      </Grid>

      <Box mt={8} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <HStack justify="space-between" mb={4}>
            <Heading as="h4" size="lg">Commands</Heading>
            <Button colorScheme={'gray'} onClick={reset}>Reset Output</Button>
        </HStack>
        <Tabs colorScheme="blue">
          <TabList>
            <Tab>Sort / Unique</Tab>
            <Tab>Filter (Grep)</Tab>
            <Tab>Substitute</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing={4} align="start">
                <Button onClick={handleSort}>Sort Lines (:sort)</Button>
                <Button onClick={handleUnique}>Unique Lines (:sort u)</Button>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Text>Filter lines based on a search string.</Text>
                <Input
                  placeholder="Search Text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  focusBorderColor="blue.500"
                />
                <HStack>
                  <Button colorScheme="blue" onClick={handleGlobal} isDisabled={!searchText}>
                    Keep lines with '{searchText}'
                  </Button>
                  <Button colorScheme="orange" onClick={handleVGlobal} isDisabled={!searchText}>
                    Remove lines with '{searchText}'
                  </Button>
                </HStack>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Text>Replace a search string with a new string.</Text>
                <HStack>
                  <Input
                    placeholder="Search Text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    focusBorderColor="blue.500"
                  />
                  <Input
                    placeholder="Replace Text"
                    value={replaceText}
                    onChange={(e) => setReplaceText(e.target.value)}
                    focusBorderColor="blue.500"
                  />
                </HStack>
                <Button colorScheme="purple" onClick={handleSubstitute} isDisabled={!searchText}>
                  Substitute '{searchText}' with '{replaceText}'
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default VimCheatsheet;
