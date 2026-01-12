import React from 'react';
import {
  VStack,
  Heading,
  Text,
  Box,
  Link as ChakraLink,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink as RouterNavLink } from 'react-router-dom';

interface TodoItem {
  name: string;
  description: string;
  implemented: boolean;
  path?: string; // Optional path for implemented features
}

interface TodoCategory {
  title: string;
  items: TodoItem[];
}

// Hardcoded data based on TODO.md content.
// In a real app, this might be fetched or dynamically parsed.
const todoData: TodoCategory[] = [
  {
    title: 'Gemini 기반 기능',
    items: [
      { name: '커밋 메시지 생성기', description: 'git diff 출력을 붙여넣으면 규칙에 맞는 커밋 메시지를 받습니다.', implemented: false },
      { name: '정규식 생성기/설명기', description: '자연어 설명에서 정규식을 생성하고 기존 정규식 패턴을 설명합니다.', implemented: false },
      { name: '코드 번역기', description: '한 프로그래밍 언어에서 다른 프로그래밍 언어로 코드 스니펫을 번역하는 도구입니다.', implemented: false },
    ],
  },
  {
    title: '일반 유틸리티',
    items: [
      { name: 'JSON/YAML 포맷터 & 검증기', description: 'JSON 또는 YAML 데이터의 형식을 지정하고 유효성을 검사하는 도구입니다.', implemented: true, path: '/json-yaml-formatter' },
      { name: '색상 팔레트 생성기', description: '단일 입력 색상 또는 테마 설명을 기반으로 색상 팔레트를 생성합니다.', implemented: true, path: '/palette-generator' },
      { name: '단위 변환기', description: '일반적인 단위(예: 픽셀, rem, em, 미터법/임페리얼) 간 변환을 위한 간단한 유틸리티입니다.', implemented: true, path: '/unit-converter' },
      { name: '대소문자 변환기', description: '텍스트의 대소문자를 다양한 형식으로 변환합니다.', implemented: true, path: '/case-converter' }, // Existing CaseConverter
      { name: 'Vim Cheatsheet', description: 'Vim 명령어 및 단축키 요약본입니다.', implemented: true, path: '/vim' }, // Add VimCheatsheet
      { name: 'Markdown 미리보기', description: '마크다운 텍스트를 실시간으로 HTML로 렌더링하여 미리보는 도구입니다.', implemented: true, path: '/markdown-preview' },
      { name: 'Base64 인코더/디코더', description: '텍스트나 파일을 Base64로 인코딩하거나 Base64 문자열을 디코딩하는 도구입니다.', implemented: true, path: '/base64-converter' },
      { name: 'JWT 디코더', description: 'JSON Web Token(JWT)을 디코딩하여 페이로드(payload), 헤더(header), 서명(signature)을 확인하는 도구입니다.', implemented: true, path: '/jwt-decoder' },
      { name: '코드 스니펫 저장소', description: '자주 사용하는 코드 스니펫을 저장하고 쉽게 검색하여 복사할 수 있는 개인용 저장소입니다.', implemented: false },
      { name: '이미지 압축/변환기', description: '이미지를 압축하여 파일 크기를 줄이거나, PNG, JPG, WebP 등 다른 형식으로 변환하는 도구입니다.', implemented: false },
    ],
  },
  {
    title: '정보 조회', // Renamed from '기타 정보' to be more descriptive
    items: [
      { name: '주식 동향 (나스닥, 코스피 등)', description: '주요 주식 시장(나스닥, 코스피 등)의 실시간 또는 지연된 동향 정보를 조회합니다.', implemented: true, path: '/stock-trends' }, // Mark as implemented and add path
      { name: '환율 정보', description: '주요 통화 쌍의 현재 환율 정보를 조회합니다.', implemented: true, path: '/exchange-rate' }, // Mark as implemented and add path
    ],
  },
];

const Home: React.FC = () => {
  const implementedColor = useColorModeValue('green.600', 'green.300');
  const plannedColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <VStack spacing={8} align="stretch" p={5}>
      <Heading as="h1" size="xl" textAlign="center">
        DevDooly 유틸리티 목록
      </Heading>

      {todoData.map((category, categoryIndex) => (
        <Box key={categoryIndex}>
          <Heading as="h2" size="lg" mb={4}>
            {category.title}
          </Heading>
          <UnorderedList spacing={3}>
            {category.items.map((item, itemIndex) => (
              <ListItem key={itemIndex}>
                {item.implemented ? (
                  <ChakraLink as={RouterNavLink} to={item.path || '#'} color={implementedColor} fontWeight="bold">
                    {item.name}
                  </ChakraLink>
                ) : (
                  <Text color={plannedColor} fontStyle="italic">
                    {item.name}
                  </Text>
                )}
                <Text fontSize="sm" color="gray.500">
                  {item.description}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      ))}
    </VStack>
  );
};

export default Home;
