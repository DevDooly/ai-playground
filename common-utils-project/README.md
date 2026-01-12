# Common Utils Project (범용 유틸리티 프로젝트)

## 📝 개요

이 프로젝트는 React, TypeScript, Vite, Chakra UI를 사용하여 만들어진 웹 기반 유틸리티 모음입니다. 텍스트 케이스 변환, Vim 명령어 시뮬레이션 등 개발자에게 유용한 도구를 제공합니다.

## ✨ 주요 기능

### 1. 케이스 변환기 (Case Converter)

입력된 텍스트를 `UPPERCASE`, `lowercase`, `camelCase`, `PascalCase`, `snake_case`, `kebab-case` 등 다양한 케이스로 변환합니다.

### 2. Vim 명령어 시뮬레이터 (Vim Cheatsheet)

텍스트에 대해 Vim과 유사한 편집 명령어를 테스트해볼 수 있는 도구입니다.

-   **Sort**: 라인을 알파벳 순으로 정렬합니다. (`:sort`)
-   **Unique**: 중복된 라인을 제거합니다. (`:sort u`)
-   **Filter (Grep)**: 특정 문자열이 포함되거나 포함되지 않은 라인만 필터링합니다. (`:g/text/p`, `:v/text/p`)
-   **Substitute**: 특정 문자열을 다른 문자열로 치환합니다. (`:%s/search/replace/g`)

## 🎨 UI / UX

-   **Chakra UI**: 모던하고 일관된 디자인 시스템을 위해 Chakra UI를 사용합니다.
-   **반응형 디자인**: 모든 기기에서 편안하게 사용할 수 있도록 반응형 레이아웃을 적용했습니다.
-   **직관적인 인터페이스**: 아이콘과 명확한 레이블을 사용하여 사용성을 높였습니다.

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

## 🛠️ 주요 기술 스택

-   **React**: UI 라이브러리
-   **TypeScript**: 정적 타입 검사
-   **Vite**: 빠른 개발 서버 및 번들러
-   **Chakra UI**: UI 컴포넌트 라이브러리
-   **React Router**: 클라이언트 사이드 라우팅
