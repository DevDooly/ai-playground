# AI Playground

이 프로젝트는 다양한 AI 및 개발 도구를 실험하고 테스트하기 위한 개인적인 플레이그라운드입니다. 여러 하위 프로젝트로 구성되어 있으며, 각 프로젝트는 특정 기술 스택이나 도구를 다룹니다.

## 🚀 프로젝트 구성

### 1. [common-utils-project](./common-utils-project/)

React와 TypeScript를 기반으로 한 웹 유틸리티 모음입니다. 현재 텍스트 케이스 변환 기능을 제공하며, Chakra UI로 스타일링 되어있습니다.

-   **주요 기술:** React, TypeScript, Vite, Chakra UI
-   **주요 기능:** 다양한 텍스트 케이스(snake_case, kebab-case, camelCase 등) 변환

### 2. [gemini-cli](./gemini-cli/)

Gemini CLI 도구의 설치 및 환경 설정 가이드를 포함하는 디렉토리입니다.

-   `install.md`: Gemini CLI 설치 절차 문서
-   `setup-github-ssh.sh`: GitHub SSH 키 설정 및 등록을 위한 셸 스크립트

### 3. [kind](./kind/)

Kind (Kubernetes in Docker)를 사용하여 로컬 환경에 쿠버네티스 클러스터를 구축하고 테스트하는 프로젝트입니다.

-   **주요 기술:** Kubernetes, Docker, Kind, NGINX
-   **주요 내용:** Kind 클러스터 설정, Ingress Controller 배포, 테스트용 NGINX 애플리케이션 배포 가이드

---

각 하위 프로젝트에 대한 자세한 내용은 해당 디렉토리의 README 파일을 참고해주세요.
