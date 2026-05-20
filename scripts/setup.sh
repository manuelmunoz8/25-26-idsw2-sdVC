#!/usr/bin/env bash
set -euo pipefail

git config --global alias.audit '!git -C "$(git rev-parse --show-toplevel)" checkout AUDIT -q && bash "$(git rev-parse --show-toplevel)/scripts/update-dashboard.sh"'

echo "Alias 'git audit' configurado."
echo "Ejecuta 'git audit' desde cualquier rama del repo."
