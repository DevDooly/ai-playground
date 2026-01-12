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

### 3. 환율 정보 (Exchange Rate Information)

주요 통화 쌍의 현재 환율 정보를 조회합니다.

### 4. 주식 동향 (Stock Trends)

주요 주식 시장(나스닥, 코스피 등)의 실시간 또는 지연된 동향 정보를 조회합니다. (Alpha Vantage API는 거래일만 제공하며, 정확한 시각은 제공하지 않습니다.)

### 5. API 키 관리

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

## 部署 (PM2)

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
