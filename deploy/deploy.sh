#!/usr/bin/env bash
# Деплой лендинга на instep-prod (77.222.42.201): git pull → npm ci → vite build → nginx reload.
# Запуск с ПК: ssh -i C:/AI/keys/instep_server root@77.222.42.201 "bash /opt/instep-landing/deploy/deploy.sh"
# Правило: сервер не редактируем руками; изменения идут через репо (push → pull).
set -euo pipefail

APP_DIR=/opt/instep-landing
cd "$APP_DIR"

echo "[landing] pull..."
git pull --ff-only

echo "[landing] install..."
npm ci --no-audit --no-fund

echo "[landing] build..."
npm run build

echo "[landing] nginx..."
nginx -t
systemctl reload nginx

echo "[landing] done: $(git rev-parse --short HEAD)"
