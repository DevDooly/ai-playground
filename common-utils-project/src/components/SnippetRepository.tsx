import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Button, VStack, HStack, Input, Textarea, Select,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, useToast, Text, IconButton, Spacer
} from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { EditIcon, DeleteIcon, CopyIcon } from '@chakra-ui/icons';
import { useClipboard } from '@chakra-ui/react';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
}

const SnippetRepository: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [currentSnippet, setCurrentSnippet] = useState<Snippet | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    try {
      const savedSnippets = localStorage.getItem('snippets');
      if (savedSnippets) {
        setSnippets(JSON.parse(savedSnippets));
      }
    } catch (error) {
      console.error("Failed to load snippets from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('snippets', JSON.stringify(snippets));
    } catch (error) {
      console.error("Failed to save snippets to localStorage", error);
    }
  }, [snippets]);

  const handleSave = () => {
    if (!currentSnippet || !currentSnippet.title || !currentSnippet.language || !currentSnippet.code) {
      toast({ title: "All fields are required.", status: "error", duration: 3000, isClosable: true });
      return;
    }
    if (currentSnippet.id) {
      setSnippets(snippets.map(s => s.id === currentSnippet.id ? currentSnippet : s));
      toast({ title: "Snippet updated.", status: "success", duration: 3000, isClosable: true });
    } else {
      setSnippets([...snippets, { ...currentSnippet, id: Date.now().toString() }]);
      toast({ title: "Snippet saved.", status: "success", duration: 3000, isClosable: true });
    }
    onClose();
  };

  const openModal = (snippet: Snippet | null = null) => {
    setCurrentSnippet(snippet || { id: '', title: '', language: 'javascript', code: '' });
    onOpen();
  };

  const handleDelete = (id: string) => {
    setSnippets(snippets.filter(s => s.id !== id));
    toast({ title: "Snippet deleted.", status: "warning", duration: 3000, isClosable: true });
  };
  
  const { onCopy, hasCopied } = useClipboard("");

  return (
    <Box>
      <HStack mb={8}>
        <Heading as="h2" size="xl">
          Code Snippet Repository
        </Heading>
        <Spacer />
        <Button colorScheme="blue" onClick={() => openModal()}>Add New Snippet</Button>
      </HStack>
      
      <VStack spacing={6} align="stretch">
        {snippets.length === 0 && <Text>No snippets saved yet. Click "Add New Snippet" to start.</Text>}
        {snippets.map(snippet => (
          <Box key={snippet.id} p={4} borderWidth="1px" borderRadius="lg">
            <HStack mb={2}>
              <Heading as="h3" size="md">{snippet.title}</Heading>
              <Text fontSize="sm" color="gray.500">({snippet.language})</Text>
              <Spacer />
              <Tooltip label="Copy code" closeOnClick={false}>
                <IconButton aria-label="Copy code" icon={<CopyIcon />} size="sm" variant="ghost" onClick={() => {onCopy(snippet.code); toast({title: "Copied!", status:"success", duration: 1000})}} />
              </Tooltip>
              <Tooltip label="Edit snippet" closeOnClick={false}>
                <IconButton aria-label="Edit snippet" icon={<EditIcon />} size="sm" variant="ghost" onClick={() => openModal(snippet)} />
               </Tooltip>
              <Tooltip label="Delete snippet" closeOnClick={false}>
                <IconButton aria-label="Delete snippet" icon={<DeleteIcon />} colorScheme="red" size="sm" variant="ghost" onClick={() => handleDelete(snippet.id)} />
              </Tooltip>
            </HStack>
            <SyntaxHighlighter language={snippet.language} style={a11yDark} customStyle={{ borderRadius: '0.375rem' }}>
              {snippet.code}
            </SyntaxHighlighter>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentSnippet?.id ? 'Edit' : 'Add'} Snippet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Title"
                value={currentSnippet?.title || ''}
                onChange={(e) => setCurrentSnippet({ ...currentSnippet!, title: e.target.value })}
              />
              <Select
                placeholder="Select language"
                value={currentSnippet?.language || 'javascript'}
                onChange={(e) => setCurrentSnippet({ ...currentSnippet!, language: e.target.value })}
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="sql">SQL</option>
                <option value="json">JSON</option>
                <option value="yaml">YAML</option>
                <option value="markdown">Markdown</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="shell">Shell</option>
              </Select>
              <Textarea
                placeholder="Code"
                value={currentSnippet?.code || ''}
                onChange={(e) => setCurrentSnippet({ ...currentSnippet!, code: e.target.value })}
                height="300px"
                fontFamily="mono"
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SnippetRepository;
