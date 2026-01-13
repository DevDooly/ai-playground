# Common Utils Project (범용 유틸리티 프로젝트)

## 📝 개요

이 프로젝트는 React, TypeScript, Vite, Chakra UI를 사용하여 만들어진 웹 기반 유틸리티 모음입니다. 텍스트 케이스 변환, Vim 명령어 시뮬레이션 등 개발자에게 유용한 도구를 제공합니다.

## ✨ 주요 기능

이 프로젝트는 개발 및 일상 작업에 유용한 다양한 유틸리티를 제공합니다.

### 텍스트 및 콘텐츠 도구

-   **케이스 변환기 (Case Converter)**: 입력된 텍스트를 `UPPERCASE`, `lowercase`, `camelCase`, `PascalCase`, `snake_case`, `kebab-case` 등 다양한 케이스로 변환합니다.
-   **JSON/YAML 포맷터 (JSON/YAML Formatter)**: JSON 또는 YAML 데이터의 형식을 지정하고 유효성을 검사합니다.
-   **Markdown 미리보기 (Markdown Preview)**: 마크다운 텍스트를 실시간으로 HTML로 렌더링하여 결과를 미리 봅니다.
-   **Base64 인코더/디코더 (Base64 Encoder/Decoder)**: 텍스트를 Base64로 인코딩하거나 Base64 문자열을 디코딩합니다.
-   **JWT 디코더 (JWT Decoder)**: JSON Web Token을 디코딩하여 페이로드와 헤더 정보를 확인합니다.
-   **단위 변환기 (Unit Converter)**: 웹 단위(px, rem, em)와 길이 단위(mm, cm, m 등) 간의 빠른 변환을 지원합니다.

### 개발 및 코드 관련 도구

-   **코드 스니펫 저장소 (Snippet Repository)**: 자주 사용하는 코드 스니펫을 언어별로 저장하고 관리합니다. (localStorage 사용)
-   **Vim 명령어 시뮬레이터 (Vim Cheatsheet)**: 텍스트에 대해 정렬, 필터링, 치환 등 Vim의 기본 편집 명령어를 테스트합니다.

### 미디어 및 그래픽 도구

-   **색상 팔레트 생성기 (Palette Generator)**: 기준 색상 하나를 입력하면 그에 맞는 다양한 색상 팔레트(밝은/어두운 음영, 보색)를 생성합니다.
-   **이미지 압축/변환기 (Image Compressor/Converter)**: 이미지를 브라우저에서 압축하거나 JPEG, PNG, WEBP 형식으로 변환합니다.

### 정보 조회 도구

-   **환율 정보 (Exchange Rate)**: 주요 통화 쌍의 현재 환율 정보를 조회합니다.
-   **주식 동향 (Stock Trends)**: 주요 주식 시장의 동향 정보를 조회합니다.

## 🔐 API 키 관리

민감한 API 키는 `.gitignore`에 추가된 `src/config.ts` 파일을 통해 관리됩니다. `src/config.example.ts` 파일을 `src/config.ts`로 복사한 후, 해당 파일에 API 키를 설정하여 사용합니다.

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

## 배포 (PM2)

Vite 프로젝트를 프로덕션 환경에서 PM2로 실행하는 방법입니다.

### 1. PM2 전역 설치

아직 PM2가 없다면 다음 명령어로 설치합니다.

```bash
npm install pm2 -g
```

### 2. 프로젝트 빌드

프로덕션용 정적 파일을 생성합니다.

```bash
npm run build
```

### 3. PM2로 서버 실행

Vite의 내장 `preview` 서버를 PM2로 실행합니다.

```bash
pm2 start "npm" --name "common-utils-project" -- run preview
```

### 실행 확인 및 로그

-   **프로세스 목록 확인**

    ```bash
    pm2 list
    ```

-   **실시간 로그 확인**

    ```bash
    pm2 logs common-utils-project
    ```

## 🛠️ 주요 기술 스택

-   **React**: UI 라이브러리
-   **TypeScript**: 정적 타입 검사
-   **Vite**: 빠른 개발 서버 및 번들러
-   **Chakra UI**: UI 컴포넌트 라이브러리
-   **React Router**: 클라이언트 사이드 라우팅
