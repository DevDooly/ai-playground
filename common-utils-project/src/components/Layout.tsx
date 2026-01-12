import React from 'react';
import { Box, Flex, Heading, List, ListItem, Link as ChakraLink } from '@chakra-ui/react';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const activeStyle = {
    color: 'blue.500',
    fontWeight: 'bold',
  };

  return (
    <ListItem>
      <ChakraLink
        as={RouterNavLink}
        to={to}
        style={({ isActive }) => (isActive ? activeStyle : {})}
        _hover={{ textDecoration: 'none', color: 'blue.500' }}
      >
        {children}
      </ChakraLink>
    </ListItem>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Flex minH="100vh">
      <Box
        as="aside"
        w="240px"
        bg="gray.50"
        p={6}
        borderRight="1px solid"
        borderColor="gray.200"
        boxShadow="sm"
      >
        <Heading as="h1" size="lg" mb={8} color="blue.600">
          DevDooly Tools
        </Heading>
        <List spacing={4}>
          <NavItem to="/">Case Converter</NavItem>
          <NavItem to="/vim">Vim Cheatsheet</NavItem>
          <NavItem to="/json-yaml-formatter">JSON/YAML 포맷터</NavItem>
        </List>
      </Box>
      <Box as="main" p={8} flex={1} bg="white">
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
