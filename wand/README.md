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

1.  **프로젝트 설정 (완료):**
    *   Compose Multiplatform 프로젝트 기본 구조를 설정합니다.
    *   Android 및 Windows 데스크톱용 빌드 구성을 완료했습니다.

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

## 빌드 및 실행 방법

이 섹션에서는 각 플랫폼(Android, Desktop)용 애플리케E이션을 빌드하고 실행하는 방법을 설명합니다.

### 공통 요구사항

- Java 17 이상의 JDK가 설치되어 있어야 합니다.

---

### Android

#### 실행

1.  **Android 기기 또는 에뮬레이터 연결:**
    개발용 PC에 Android 기기를 연결하거나 Android Studio에서 에뮬레이터를 실행합니다. `adb devices` 명령어로 기기가 정상적으로 인식되는지 확인합니다.

2.  **앱 설치:**
    다음 명령어를 실행하여 디버그 버전의 앱을 기기에 설치합니다.

    ```bash
    ./gradlew :android:installDebug
    ```

3.  **앱 실행:**
    설치 후 기기의 앱 목록에서 'Wand'를 찾아 실행하거나, 다음 `adb` 명령어를 사용해 직접 실행할 수 있습니다.

    ```bash
    adb shell am start -n dev.dooly.wand.android/dev.dooly.wand.android.MainActivity
    ```

#### 빌드 (APK)

디버그용 APK 파일을 빌드하려면 다음 명령어를 실행합니다.

```bash
./gradlew :android:assembleDebug
```

빌드가 완료되면 APK 파일은 `android/build/outputs/apk/debug/` 디렉터리에서 찾을 수 있습니다.

#### 테스트

프로젝트에 테스트 코드가 추가되면 다음 명령어를 사용하여 실행할 수 있습니다.

-   **Unit Tests:**
    ```bash
    ./gradlew :android:testDebugUnitTest
    ```
-   **Instrumented Tests:** (기기 또는 에뮬레이터 필요)
    ```bash
    ./gradlew :android:connectedDebugAndroidTest
    ```

---

### Desktop (Windows, macOS, Linux)

#### 실행

개발 환경에서 데스크톱 애플리케이션을 직접 실행하려면 다음 명령어를 사용합니다.

```bash
./gradlew :desktop:run
```

#### 빌드 (배포용 패키지)

각 운영체제에 맞는 배포용 패키지를 생성할 수 있습니다.

-   **현재 OS에 맞는 기본 패키지 생성:**
    ```bash
    ./gradlew :desktop:packageDistributionForCurrentOS
    ```
-   **특정 포맷으로 패키지 생성:**
    -   Windows: `./gradlew :desktop:packageMsi`
    -   macOS: `./gradlew :desktop:packageDmg`
    -   Linux: `./gradlew :desktop:packageDeb`

빌드된 패키지는 `desktop/build/compose/binaries/` 디렉터리 내에서 찾을 수 있습니다.

#### 테스트

프로젝트에 테스트 코드가 추가되면 다음 명령어를 사용하여 실행할 수 있습니다.

```bash
./gradlew :desktop:test
```
