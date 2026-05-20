#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(git rev-parse --show-toplevel)"
BRANCH="AUDIT"
CURRENT=$(git -C "$REPO_DIR" branch --show-current)

if [ "$CURRENT" != "$BRANCH" ]; then
    git -C "$REPO_DIR" checkout "$BRANCH" -q
fi

bash "$REPO_DIR/scripts/monitor.sh"

git -C "$REPO_DIR" add DASHBOARD.md
git -C "$REPO_DIR" commit -m "audit: actualizacion $(date +%Y-%m-%d)" -q
git -C "$REPO_DIR" push -q

git -C "$REPO_DIR" checkout main -q 2>/dev/null || true

echo "Dashboard actualizado y pusheado."
