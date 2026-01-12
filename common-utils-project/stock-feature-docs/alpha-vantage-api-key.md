# Alpha Vantage API 키 발급 방법

'주식 동향' 기능을 사용하려면 Alpha Vantage API 키가 필요합니다. 다음 단계에 따라 무료 API 키를 발급받을 수 있습니다.

1.  **Alpha Vantage 웹사이트 방문:**
    웹 브라우저를 열고 다음 Alpha Vantage 웹사이트에 접속합니다:
    [https://www.alphavantage.co/](https://www.alphavantage.co/)

2.  **무료 API 키 요청:**
    웹사이트 상단의 메뉴 또는 페이지 중간에 있는 "GET YOUR FREE API KEY" 또는 "Get Free API Key" 버튼을 클릭합니다.

3.  **정보 입력 및 가입:**
    요청 양식에 이름, 이메일 주소, 직업 및 사용 목적 등의 정보를 입력합니다. 서비스 약관에 동의하고 "GET FREE API KEY" 버튼을 클릭하여 제출합니다.

4.  **API 키 확인:**
    제출 후, Alpha Vantage에서 발급된 API 키가 포함된 페이지로 리디렉션되거나, 등록한 이메일 주소로 API 키가 전송됩니다. 발급된 API 키를 복사해둡니다.

5.  **API 키 설정 (보안 권장):**
    API 키는 공개된 Git 저장소에 직접 커밋되지 않도록 주의해야 합니다. 다음과 같이 설정하는 것을 권장합니다:

    a.  **`src/config.example.ts` 파일 복사 및 이름 변경:**
        프로젝트 루트 디렉토리에서 `src/config.example.ts` 파일을 `src/config.ts`로 복사하고 이름을 변경합니다.
        ```bash
        cp src/config.example.ts src/config.ts
        ```

    b.  **`.gitignore` 확인:**
        `src/config.ts` 파일은 이미 `.gitignore`에 추가되어 있으므로 Git 저장소에 커밋되지 않습니다. 이 파일을 Git에 추가하지 않도록 주의하십시오.

    c.  **`src/config.ts` 파일 업데이트:**
        새로 생성된 `src/config.ts` 파일을 열고 `'YOUR_ALPHA_VANTAGE_API_KEY'` 부분을 발급받은 실제 API 키로 교체합니다.

        예시 (`src/config.ts`):
        ```typescript
        export const ALPHA_VANTAGE_API_KEY = 'YOUR_ACTUAL_ALPHA_VANTAGE_API_KEY_HERE';
        ```

**주의사항:**

*   Alpha Vantage는 무료 사용자에게 분당 5회, 일일 500회 호출 제한을 두고 있습니다. 이 제한을 초과하면 데이터가 제대로 로드되지 않을 수 있습니다.
*   API 키는 외부에 노출되지 않도록 주의해야 합니다. 프로덕션 환경에서는 환경 변수나 보안 설정 파일을 통해 관리하는 것이 좋습니다.
