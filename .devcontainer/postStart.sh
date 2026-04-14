#!/usr/bin/env bash
set -euo pipefail

echo "[postStart] Waiting for Postgres..."
for i in {1..60}; do
  if pg_isready -h db -p 5432 -U postgres >/dev/null 2>&1; then
    echo "Postgres ready"
    break
  fi
  sleep 1
done

if [ ! -f .env ]; then
  cat > .env <<'EOF'
DATABASE_URL="postgresql://postgres:postgres@db:5432/unified_dashboard?schema=public"
APP_BASE_URL="http://localhost:3000"
SESSION_SECRET="change-me-change-me-change-me-change-me-32chars"
TOTP_ENCRYPTION_KEY_BASE64="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
COOKIE_SECURE="false"
COOKIE_SAMESITE="lax"
ADMIN_BOOTSTRAP_EMAIL="admin@example.com"
ADMIN_BOOTSTRAP_PASSWORD="ChangeMe123456!"
ADMIN_BOOTSTRAP_NAME="Admin"
EOF
fi

pnpm prisma:generate || true
pnpm prisma:migrate:dev --name init || true
pnpm db:seed || true

if ! lsof -i:3000 >/dev/null; then
  nohup pnpm dev > dev.log 2>&1 &
fi
