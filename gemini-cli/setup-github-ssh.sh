#!/bin/bash
set -e

KEY="$HOME/.ssh/id_ed25519_github"
PUB="$KEY.pub"
SSH_CONFIG="$HOME/.ssh/config"

if [ -f "$KEY" ]; then
  echo "키가 이미 존재합니다: $KEY"
  echo "원하시면 먼저 삭제하세요: rm $KEY $PUB"
  exit 1
fi

mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"

ssh-keygen -t ed25519 -f "$KEY" -C "rudy@$(hostname)-$(date +%F)" -N ""
chmod 600 "$KEY"
chmod 644 "$PUB"

# ssh-agent에 추가 (현재 세션)
eval "$(ssh-agent -s)" >/dev/null
ssh-add "$KEY" >/dev/null || true

# ~/.ssh/config에 기본 항목 추가 (없으면 추가, 있으면 덮어쓰지 않음)
if ! grep -q "IdentityFile $KEY" "$SSH_CONFIG" 2>/dev/null; then
  cat >> "$SSH_CONFIG" <<EOF

Host github.com
  HostName github.com
  User git
  IdentityFile $KEY
  IdentitiesOnly yes
EOF
  chmod 600 "$SSH_CONFIG"
  echo "ssh config에 항목 추가됨: $SSH_CONFIG"
else
  echo "ssh config에 이미 IdentityFile 설정이 있습니다."
fi

echo
echo "공개키 (아래 전체 내용을 GitHub → Settings → SSH and GPG keys → New SSH key에 붙여넣으세요):"
echo "--------------------------------------------------------------------------------"
cat "$PUB"
echo "--------------------------------------------------------------------------------"
echo "이제 웹에서 공개키를 등록한 뒤 아래 커맨드로 테스트하세요:"
echo "  ssh -T git@github.com"
echo
echo "기본 사용 예:"
echo "  # 기존 레포에서 HTTPS -> SSH로 바꾸기"
echo "  git remote set-url origin git@github.com:DevDooly/ai-playground.git"
echo "  git remote -v"
