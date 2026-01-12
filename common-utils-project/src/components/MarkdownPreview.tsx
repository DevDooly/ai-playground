import React, { useState } from 'react';
import { Box, Heading, Textarea, Grid, GridItem } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

const MarkdownPreview: React.FC = () => {
  const [markdown, setMarkdown] = useState(`# Hello, Markdown!\n\n**This is a simple Markdown previewer.**\n\n- Write Markdown in the left pane.\n- See the rendered HTML in the right pane.\n\n\
console.log('Hello, world!');\n\
`);

  return (
    <Box>
      <Heading as="h2" size="xl" mb={8}>
        Markdown Preview
      </Heading>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
        <GridItem>
          <Heading as="h3" size="md" mb={2}>
            Markdown Input
          </Heading>
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter Markdown here..."
            size="lg"
            height="500px"
            fontFamily="mono"
          />
        </GridItem>
        <GridItem>
          <Heading as="h3" size="md" mb={2}>
            Preview
          </Heading>
          <Box p={4} borderWidth="1px" borderRadius="lg" height="500px" overflowY="auto">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MarkdownPreview;
