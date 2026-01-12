import React, { useState } from 'react';
import {
  Box,
  Button,
  Textarea,
  VStack,
  HStack,
  Text,
  useToast,
  Code,
  Select,
  useClipboard
} from '@chakra-ui/react';
import * as yaml from 'js-yaml';

const JsonYamlFormatter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [inputType, setInputType] = useState<'json' | 'yaml'>('json');
  const [outputType, setOutputType] = useState<'json' | 'yaml'>('json');
  const toast = useToast();
  const { onCopy, hasCopied } = useClipboard(outputText);

  const formatContent = () => {
    try {
      let parsed: any;
      if (inputType === 'json') {
        parsed = JSON.parse(inputText);
      } else {
        parsed = yaml.load(inputText);
      }

      let formatted: string;
      if (outputType === 'json') {
        formatted = JSON.stringify(parsed, null, 2);
      } else {
        formatted = yaml.dump(parsed);
      }
      setOutputText(formatted);
      toast({
        title: '성공',
        description: '내용이 성공적으로 변환 및 포맷되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (e: any) {
      setOutputText('');
      toast({
        title: '오류',
        description: `입력 형식이 잘못되었거나 변환에 실패했습니다: ${e.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error(e);
    }
  };

  const clearContent = () => {
    setInputText('');
    setOutputText('');
    toast({
      title: '초기화',
      description: '내용이 지워졌습니다.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch" p={5}>
      <Text fontSize="2xl" fontWeight="bold">JSON/YAML 포맷터 & 검증기</Text>

      <HStack spacing={4}>
        <Select value={inputType} onChange={(e) => setInputType(e.target.value as 'json' | 'yaml')} width="fit-content">
          <option value="json">JSON 입력</option>
          <option value="yaml">YAML 입력</option>
        </Select>
        <Select value={outputType} onChange={(e) => setOutputType(e.target.value as 'json' | 'yaml')} width="fit-content">
          <option value="json">JSON 출력</option>
          <option value="yaml">YAML 출력</option>
        </Select>
      </HStack>

      <HStack spacing={4} align="stretch">
        <Box flex={1}>
          <Textarea
            placeholder="여기에 JSON 또는 YAML을 입력하세요..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            size="sm"
            height="300px"
            fontFamily="mono"
          />
        </Box>
        <Box flex={1}>
          <Code
            p={3}
            width="100%"
            height="300px"
            overflow="auto"
            whiteSpace="pre-wrap"
            children={outputText || "포맷된 출력이 여기에 나타납니다."}
          />
        </Box>
      </HStack>

      <HStack>
        <Button colorScheme="blue" onClick={formatContent}>포맷 및 변환</Button>
        <Button colorScheme="red" onClick={clearContent}>초기화</Button>
        <Button colorScheme="teal" onClick={onCopy} ml={2}>
          {hasCopied ? "복사됨!" : "결과 복사"}
        </Button>
      </HStack>
    </VStack>
  );
};

export default JsonYamlFormatter;
