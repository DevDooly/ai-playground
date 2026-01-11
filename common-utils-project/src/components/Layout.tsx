import React from 'react';
import { Box, Flex, Heading, List, ListItem, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Flex>
      <Box as="aside" w="200px" borderRight="1px solid" borderColor="gray.200" p={4}>
        <Heading as="h3" size="md" mb={4}>Features</Heading>
        <List spacing={3}>
          <ListItem>
            <ChakraLink as={RouterLink} to="/">
              Case Converter
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ChakraLink as={RouterLink} to="/vim">
              Vim Cheatsheet
            </ChakraLink>
          </ListItem>
        </List>
      </Box>
      <Box as="main" p={4} flex={1}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
