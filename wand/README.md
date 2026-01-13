# Wand

Windows와 Android를 위한 크로스플랫폼 터미널 애플리케이션입니다.

## 개발 방향

이 프로젝트는 Kotlin과 Compose Multiplatform을 사용하여 Windows와 Android에서 모두 네이티브 UI와 성능을 제공하는 것을 목표로 합니다.

### 기술 스택

*   **언어:** Kotlin
*   **프레임워크:** Compose Multiplatform
*   **타겟 플랫폼:**
    *   Windows
    *   Android

### 개발 계획

1.  **프로젝트 설정:**
    *   Compose Multiplatform 프로젝트 기본 구조를 설정합니다.
    *   Android 및 Windows 데스크톱용 빌드 구성을 완료합니다.

2.  **핵심 로직 개발 (공통 모듈):**
    *   터미널 명령어 파싱 및 실행 로직을 구현합니다.
    *   상태 관리 (현재 경로, 명령어 히스토리 등) 로직을 개발합니다.
    *   파일 시스템 접근 및 기타 시스템 상호작용을 위한 인터페이스를 정의합니다.

3.  **UI 개발:**
    *   **Android:** Jetpack Compose를 사용하여 모바일에 최적화된 터미널 UI를 구현합니다.
    *   **Windows:** Compose for Desktop을 사용하여 데스크톱 환경에 맞는 UI를 구현합니다.
    *   공통 UI 컴포넌트 (예: 명령어 입력창, 결과 출력 화면)를 최대한 공유합니다.

4.  **플랫폼별 기능 구현:**
    *   각 플랫폼(Windows, Android)의 특성에 맞는 추가 기능을 구현합니다. (예: Windows의 경우 PowerShell/CMD 통합, Android의 경우 Termux API 연동 등)

5.  **테스트 및 배포:**
    *   단위 테스트 및 UI 테스트를 작성하여 안정성을 확보합니다.
    *   각 플랫폼 스토어에 배포하기 위한 패키징을 진행합니다.
