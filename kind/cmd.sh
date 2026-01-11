#!/bin/bash

#[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64

# * 실행 권한 부여 및 이동
#chmod +x ./kind
#sudo mv ./kind /usr/local/bin/kind
#kind --version
#
# * 클러스터 생성
#   기본 이름(kind)으로 클러스터를 생성합니다. (처음 실행 시 노드 이미지를 다운로드하느라 시간이 조금 걸릴 수 있습니다.)
# kind create cluster
#
#   특정 이름으로 생성하고 싶다면: kind create cluster --name my-cluster
# * 클러스터 상태 확인
#   클러스터가 정상적으로 생성되었는지 kubectl로 확인합니다.
# kubectl cluster-info --context kind-kind
#
# * 노드 확인
kubectl get nodes
#
#   결과가 Ready 상태로 나온다면 설치 성공입니다.
#요약 (설치 후 자주 쓰는 명령어)
#| 동작 | 명령어 |
#|---|---|
#| 클러스터 생성 | kind create cluster |
#| 클러스터 목록 확인 | kind get clusters |
#| 클러스터 삭제 | kind delete cluster |
#| 특정 클러스터 삭제 | kind delete cluster --name [이름] |
#
