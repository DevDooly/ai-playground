# Kind (Kubernetes in Docker) 테스트 환경

이 디렉터리에는 테스트 목적으로 Kind를 사용하여 로컬 쿠버네티스 클러스터를 설정하는 데 필요한 파일과 지침이 포함되어 있습니다.

## 사전 요구 사항

시작하기 전에 다음 도구가 설치되어 있어야 합니다.

*   **Docker:** Kind는 Docker를 사용하여 쿠버네티스 노드를 실행합니다.
*   **kubectl:** 쿠버네티스 커맨드 라인 도구입니다.
*   **Kind:** 로컬 쿠버네티스 클러스터를 실행하기 위한 도구입니다.

설치되어 있지 않다면, 아래의 Ubuntu용 설치 단계를 따를 수 있습니다.

<details>
<summary>설치 방법 펼치기</summary>

### 1. Docker 설치

```bash
# 패키지 목록 업데이트 및 필수 패키지 설치
sudo apt update
sudo apt install -y curl apt-transport-https ca-certificates software-properties-common

# Docker 설치
sudo apt install -y docker.io

# Docker 서비스 시작 및 현재 사용자를 docker 그룹에 추가
sudo systemctl enable --now docker
sudo usermod -aG docker $USER

# 현재 세션에 그룹 변경 사항 적용
newgrp docker
```

### 2. kubectl 설치

```bash
# kubectl 최신 안정 버전 다운로드
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# kubectl을 /usr/local/bin에 설치
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
rm kubectl

# 설치 확인
kubectl version --client
```

### 3. Kind 설치

```bash
# 아키텍처에 맞는 kind 바이너리 다운로드
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
# ARM64의 경우:
# [ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-arm64

# 실행 권한을 부여하고 PATH로 이동
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# 설치 확인
kind --version
```

</details>

## 클러스터 및 NGINX 설정

이 설정은 `http://localhost:30001`에서 테스트용 NGINX 서버를 노출합니다.

### 1. Kind 클러스터 생성

`kind-config.yaml` 파일은 로컬 머신의 `30001` 포트를 클러스터 내부의 인그레스 컨트롤러에 매핑하도록 구성되어 있습니다.

```bash
# 클러스터 생성
kind create cluster --config kind-config.yaml
```

### 2. NGINX 인그레스 컨트롤러 설치

이 컨트롤러는 클러스터의 서비스에 대한 외부 접근을 관리하는 데 필요합니다.

```bash
# 인그레스 컨트롤러 매니페스트 적용
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

# 컨트롤러가 준비될 때까지 대기 (약 1분 소요될 수 있음)
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s
```

### 3. 테스트 NGINX 애플리케이션 배포

`nginx-app.yaml` 파일에는 기본 NGINX 서버를 위한 Deployment, Service, Ingress가 포함되어 있습니다.

```bash
# 애플리케이션 매니페스트 적용
kubectl apply -f nginx-app.yaml
```

### 4. NGINX 시작 페이지 접속

모든 것이 배포되면 브라우저에서 다음 주소로 NGINX 시작 페이지에 접속할 수 있습니다.

[http://localhost:30001](http://localhost:30001)

## 정리하기

클러스터와 모든 리소스를 삭제하려면 다음을 실행하십시오.

```bash
kind delete cluster
```