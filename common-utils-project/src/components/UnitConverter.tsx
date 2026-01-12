import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Select,
  useToast,
  Heading,
  Code,
  useClipboard
} from '@chakra-ui/react';

// Define conversion rates relative to a base unit (e.g., pixels for screen units, mm for physical units)
// For simplicity, let's assume 16px = 1rem = 1em by default, and common physical units.
// Users can later configure base font size if needed.
const CONVERSION_FACTORS: { [key: string]: { [key: string]: number } } = {
  // Web units (base: px)
  px: { px: 1, rem: 1 / 16, em: 1 / 16 },
  rem: { px: 16, rem: 1, em: 1 },
  em: { px: 16, rem: 1, em: 1 },
  // Length units (base: mm)
  mm: { mm: 1, cm: 0.1, m: 0.001, in: 1 / 25.4, pt: 72 / 25.4, pc: 6 / 25.4 },
  cm: { mm: 10, cm: 1, m: 0.01, in: 10 / 25.4, pt: (72 * 10) / 25.4, pc: (6 * 10) / 25.4 },
  m: { mm: 1000, cm: 100, m: 1, in: 1000 / 25.4, pt: (72 * 1000) / 25.4, pc: (6 * 1000) / 25.4 },
  in: { mm: 25.4, cm: 2.54, m: 0.0254, in: 1, pt: 72, pc: 6 },
  pt: { mm: 25.4 / 72, cm: 2.54 / 72, m: 0.0254 / 72, in: 1 / 72, pt: 1, pc: 1 / 12 },
  pc: { mm: 25.4 / 6, cm: 2.54 / 6, m: 0.0254 / 6, in: 1 / 6, pt: 12, pc: 1 },
};

// Group units for better display in Select components
const UNIT_GROUPS = {
  '웹 단위': ['px', 'rem', 'em'],
  '길이 단위': ['mm', 'cm', 'm', 'in', 'pt', 'pc'],
};

const UnitConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputUnit, setInputUnit] = useState<string>('px');
  const [outputUnit, setOutputUnit] = useState<string>('rem');
  const [convertedValue, setConvertedValue] = useState<string>('');
  const toast = useToast();
  const { onCopy, hasCopied } = useClipboard(convertedValue);

  const performConversion = useCallback(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setConvertedValue('');
      toast({
        title: '오류',
        description: '유효한 숫자를 입력해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Determine the group of the input unit
    let inputGroup: string | undefined;
    for (const group in UNIT_GROUPS) {
      if ((UNIT_GROUPS as any)[group].includes(inputUnit)) {
        inputGroup = group;
        break;
      }
    }

    // Determine the group of the output unit
    let outputGroup: string | undefined;
    for (const group in UNIT_GROUPS) {
      if ((UNIT_GROUPS as any)[group].includes(outputUnit)) {
        outputGroup = group;
        break;
      }
    }

    if (inputGroup === undefined || outputGroup === undefined || inputGroup !== outputGroup) {
        setConvertedValue('');
        toast({
            title: '오류',
            description: '서로 다른 단위 그룹 간의 변환은 지원하지 않습니다.',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        return;
    }

    // Perform conversion within the same unit group
    if (CONVERSION_FACTORS[inputUnit] && CONVERSION_FACTORS[inputUnit][outputUnit]) {
      const result = value * (CONVERSION_FACTORS[inputUnit][outputUnit]);
      setConvertedValue(result.toFixed(4)); // Limit to 4 decimal places
    } else {
      setConvertedValue('');
      toast({
        title: '오류',
        description: '지원하지 않는 단위 조합입니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [inputValue, inputUnit, outputUnit, toast]);

  useEffect(() => {
    if (inputValue) {
      performConversion();
    } else {
      setConvertedValue('');
    }
  }, [inputValue, performConversion]); // Recalculate on input change

  const clearInputs = () => {
    setInputValue('');
    setConvertedValue('');
    toast({
      title: '초기화',
      description: '입력 내용이 지워졌습니다.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch" p={5}>
      <Heading as="h2" size="xl">단위 변환기</Heading>

      <HStack spacing={4} alignItems="flex-end">
        <Box>
          <Text mb={1}>입력 값</Text>
          <Input
            placeholder="값 입력"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="number"
            min="0"
          />
        </Box>
        <Box>
          <Text mb={1}>입력 단위</Text>
          <Select value={inputUnit} onChange={(e) => setInputUnit(e.target.value)}>
            {Object.entries(UNIT_GROUPS).map(([groupName, units]) => (
              <optgroup label={groupName} key={groupName}>
                {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
              </optgroup>
            ))}
          </Select>
        </Box>
        <Text fontSize="2xl">=</Text>
        <Box>
          <Text mb={1}>출력 단위</Text>
          <Select value={outputUnit} onChange={(e) => setOutputUnit(e.target.value)}>
            {Object.entries(UNIT_GROUPS).map(([groupName, units]) => (
              <optgroup label={groupName} key={groupName}>
                {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
              </optgroup>
            ))}
          </Select>
        </Box>
        <Box flex={1}>
          <Text mb={1}>결과</Text>
          <Code p={2} width="100%" minHeight="40px" display="flex" alignItems="center">
            {convertedValue || '결과'}
          </Code>
        </Box>
      </HStack>

      <HStack>
        <Button colorScheme="blue" onClick={performConversion}>변환</Button>
        <Button colorScheme="red" onClick={clearInputs}>초기화</Button>
        <Button colorScheme="teal" onClick={onCopy} ml={2}>
          {hasCopied ? "복사됨!" : "결과 복사"}
        </Button>
      </HStack>
    </VStack>
  );
};

export default UnitConverter;
