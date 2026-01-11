#!/bin/bash

# install nvm & node
## https://nodejs.org/ko/download

# nvm 다운로드 및 설치:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Node.js 다운로드 및 설치:
nvm install 24

# Node.js 버전 확인:
node -v # "v24.12.0"가 출력되어야 합니다.
nvm current # "v24.12.0"가 출력되어야 합니다.

# Verify the Node.js version:
node -v # Should print "v24.12.0".

npm 버전 확인:
npm -v # 11.6.2가 출력되어야 합니다.

# install gemeni cli 
## https://geminicli.com/docs/get-started/installation/

npm install -g @google/gemini-cli

gemini
