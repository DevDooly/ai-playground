# Wand 프로젝트 To-Do 리스트

## 1. 기본 UI 구조 설계 (Compose Multiplatform)
- [ ] **(공통) `TerminalView` 컴포저블 생성:**
    - [ ] 명령어 이력(history)을 표시할 `LazyColumn` 구현
    - [ ] 명령어 입력을 위한 `TextField` 구현
    - [ ] 현재 경로(current path)를 표시할 `Text` 구현
- [ ] **(Android) `MainActivity.kt` 설정:**
    - [ ] `TerminalView`를 포함하도록 `setContent` 업데이트
- [ ] **(Desktop) `Main.kt` 설정:**
    - [ ] `TerminalView`를 포함하도록 `Window` content 업데이트

## 2. 핵심 상태 관리 로직 구현 (공통 모듈: `shared`)
- [ ] **`TerminalState` 데이터 클래스 또는 ViewModel 생성:**
    - [ ] 명령어 이력 (`List<String>`)
    - [ ] 현재 경로 (`String`)
    - [ ] 사용자 입력 (`String`)
- [ ] **상태 업데이트 로직 구현:**
    - [ ] `TextField` 입력에 따라 `userInput` 상태 업데이트
    - [ ] 명령어 실행 시 `history`에 명령어와 결과 추가
    - [ ] 명령어 실행 후 `userInput` 초기화

## 3. 명령어 실행 로직 구현 (Platform-specific)
- [ ] **(공통) `CommandExecutor` 인터페이스 정의:**
    - `suspend fun execute(command: String): String`
- [ ] **(Android) `AndroidCommandExecutor` 구현:**
    - [ ] `Runtime.getRuntime().exec()` 또는 다른 방법을 사용하여 셸 명령어 실행
    - [ ] `/system/bin/sh`를 사용하여 명령어 실행
    - [ ] 결과(stdout, stderr)를 문자열로 반환
    - *참고: Android의 샌드박스 환경으로 인해 권한 및 파일 접근에 제약이 있을 수 있음*
- [ ] **(Desktop) `DesktopCommandExecutor` 구현:**
    - [ ] `java.lang.ProcessBuilder`를 사용하여 프로세스 생성
    - [ ] OS에 따라 `cmd.exe /c` (Windows) 또는 `/bin/bash -c` (Linux/macOS)를 사용하여 명령어 실행
    - [ ] 결과(stdout, stderr)를 문자열로 반환
- [ ] **Dependency Injection 설정:**
    - [ ] `expect/actual` 키워드를 사용하여 각 플랫폼에 맞는 `CommandExecutor` 주입

## 4. UI와 핵심 로직 연결
- [ ] `TerminalView`에서 `TerminalState`를 관찰(observe)하여 UI 업데이트
- [ ] `TextField`에서 엔터 키 입력 시 `CommandExecutor`를 사용하여 명령어 실행
- [ ] 실행 결과를 `TerminalState`에 반영하여 UI에 표시

## 5. 고급 기능 및 개선
- [ ] 명령어 히스토리 탐색 (위/아래 화살표 키)
- [ ] 자동 스크롤 기능 구현
- [ ] UI 스타일링 및 테마 적용 (Material Design)
- [ ] 명령어 자동 완성 기능 (선택 사항)
- [ ] 탭(Tab) 기능 구현 (여러 터미널 세션)