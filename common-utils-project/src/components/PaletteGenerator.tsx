import React, { useState } from 'react';
import { Box, Heading, Text, Input, Button, VStack, HStack, useToast } from '@chakra-ui/react';
import tinycolor from 'tinycolor2';

const PaletteGenerator: React.FC = () => {
  const [inputColor, setInputColor] = useState('');
  const [palette, setPalette] = useState<string[]>([]);
  const toast = useToast();

  const generatePalette = () => {
    if (!inputColor) {
      toast({
        title: 'Input required',
        description: 'Please enter a color or theme description.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const baseColor = tinycolor(inputColor);

    if (!baseColor.isValid()) {
      toast({
        title: 'Invalid color',
        description: 'Please enter a valid color (e.g., #FF0000, red, rgb(255,0,0)).',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setPalette([]);
      return;
    }

    const newPalette: string[] = [];
    newPalette.push(baseColor.toHexString()); // Base color

    // Generate lighter shades
    for (let i = 1; i <= 3; i++) {
      newPalette.push(baseColor.lighten(i * 10).toHexString());
    }

    // Generate darker shades
    for (let i = 1; i <= 3; i++) {
      newPalette.push(baseColor.darken(i * 10).toHexString());
    }
    
    // Add a complementary color
    newPalette.push(baseColor.complement().toHexString());

    setPalette(newPalette);
  };

  return (
    <Box>
      <Heading as="h2" size="xl" mb={8}>
        Palette Generator
      </Heading>
      <Text mb={4}>
        Generate a color palette based on a single input color (e.g., #FF0000, red, rgb(255,0,0)).
      </Text>

      <VStack spacing={4} align="stretch">
        <HStack>
          <Input
            placeholder="Enter a color (e.g., #FF0000, blue, rgb(0,0,255))"
            value={inputColor}
            onChange={(e) => setInputColor(e.target.value)}
            size="lg"
            flex="1"
          />
          <Button colorScheme="blue" size="lg" onClick={generatePalette}>
            Generate Palette
          </Button>
        </HStack>

        {palette.length > 0 && (
          <Box p={4} borderWidth="1px" borderRadius="lg" mt={8}>
            <Heading as="h3" size="md" mb={4}>
              Generated Palette
            </Heading>
            <HStack wrap="wrap" spacing={4}>
              {palette.map((color, index) => (
                <VStack key={index} spacing={1} borderWidth="1px" borderRadius="md" p={2}>
                  <Box w="70px" h="70px" bg={color} borderRadius="md" border="1px solid lightgray" />
                  <Text fontSize="sm" fontFamily="mono">
                    {color.toUpperCase()}
                  </Text>
                </VStack>
              ))}
            </HStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default PaletteGenerator;
