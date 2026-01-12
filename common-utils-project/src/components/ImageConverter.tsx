import React, { useState } from 'react';
import {
  Box, Heading, Button, VStack, HStack, Input, Select, Text, Image,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb,
  FormControl, FormLabel, useToast, Spinner, Grid, GridItem
} from '@chakra-ui/react';
import imageCompression from 'browser-image-compression';

const ImageConverter: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [options, setOptions] = useState({
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg',
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setOriginalPreview(URL.createObjectURL(file));
      setCompressedFile(null);
      setCompressedPreview(null);
    }
  };

  const handleCompress = async () => {
    if (!originalFile) {
      toast({ title: 'Please select an image first.', status: 'warning', duration: 3000, isClosable: true });
      return;
    }
    setIsLoading(true);
    try {
      const compressionOptions = {
        ...options,
        // The library expects fileType to be a string like 'image/jpeg'
        // which it gets from the state.
      };
      const compressed = await imageCompression(originalFile, compressionOptions);
      setCompressedFile(compressed);
      setCompressedPreview(URL.createObjectURL(compressed));
      toast({ title: 'Image compressed successfully!', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: 'Error compressing image.', description: (error as Error).message, status: 'error', duration: 5000, isClosable: true });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if(compressedFile && compressedPreview) {
      const a = document.createElement('a');
      a.href = compressedPreview;
      a.download = compressedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  return (
    <Box>
      <Heading as="h2" size="xl" mb={8}>Image Compressor / Converter</Heading>
      <Grid templateColumns={{base: "1fr", md: "1fr 2fr"}} gap={6}>
        <GridItem>
            <VStack spacing={4} align="stretch">
                <FormControl>
                <FormLabel>1. Upload Image</FormLabel>
                <Input type="file" accept="image/*" onChange={handleFileChange} p={1} />
                </FormControl>

                <FormControl>
                <FormLabel>2. Set Compression Options</FormLabel>
                <VStack spacing={2} align="stretch">
                    <Text>Max Size (MB): {options.maxSizeMB}</Text>
                    <Slider value={options.maxSizeMB} min={0.1} max={5} step={0.1} onChange={(val) => setOptions({ ...options, maxSizeMB: val })}>
                        <SliderTrack><SliderFilledTrack /></SliderTrack><SliderThumb />
                    </Slider>
                     <Text>Output Format</Text>
                    <Select value={options.fileType} onChange={(e) => setOptions({ ...options, fileType: e.target.value })}>
                        <option value="image/jpeg">JPEG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WEBP</option>
                    </Select>
                </VStack>
                </FormControl>
                
                <Button colorScheme="blue" onClick={handleCompress} isLoading={isLoading} loadingText="Compressing...">
                3. Compress Image
                </Button>
            </VStack>
        </GridItem>

        <GridItem>
            <HStack spacing={6} align="center" justify="center">
                <VStack>
                    <Heading size="md">Original</Heading>
                    {originalPreview ? <Image src={originalPreview} alt="Original" maxH="300px" /> : <Box w="300px" h="300px" bg="gray.100" />}
                    {originalFile && <Text>{(originalFile.size / 1024 / 1024).toFixed(2)} MB</Text>}
                </VStack>
                <VStack>
                    <Heading size="md">Compressed</Heading>
                    {isLoading ? <Spinner size="xl" /> : compressedPreview ? <Image src={compressedPreview} alt="Compressed" maxH="300px" /> : <Box w="300px" h="300px" bg="gray.100" />}
                    {compressedFile && <Text>{(compressedFile.size / 1024 / 1024).toFixed(2)} MB</Text>}
                    {compressedFile && <Button onClick={handleDownload} mt={2}>Download Compressed</Button>}
                </VStack>
            </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ImageConverter;
