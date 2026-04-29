#!/bin/bash
# ====================================================================
# Script de deploy — Futebol App
# ====================================================================
# Este script:
#   1. Inicializa o repositório git local
#   2. Faz o primeiro commit
#   3. Conecta com o repositório do GitHub que você criou
#   4. Faz o push
#
# DEPOIS DO PUSH, vá em https://vercel.com e importe o repo.
# ====================================================================

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}====================================${NC}"
echo -e "${BLUE}  Deploy do Futebol App ⚽         ${NC}"
echo -e "${BLUE}====================================${NC}"
echo ""

# Verifica se git está instalado
if ! command -v git &> /dev/null; then
  echo -e "${RED}❌ Git não está instalado. Instale em https://git-scm.com${NC}"
  exit 1
fi

# Verifica se já é repo git
if [ -d ".git" ]; then
  echo -e "${YELLOW}⚠️  Já existe um repositório git aqui.${NC}"
  read -p "Deseja continuar mesmo assim? (s/n): " continue_anyway
  if [ "$continue_anyway" != "s" ]; then
    echo "Abortando."
    exit 0
  fi
else
  echo -e "${GREEN}→ Inicializando repositório git...${NC}"
  git init
  git branch -M main
fi

# Pergunta a URL do repositório GitHub
echo ""
echo -e "${YELLOW}📌 ANTES DE CONTINUAR:${NC}"
echo "   1. Vá em https://github.com/new"
echo "   2. Crie um repositório chamado 'futebol-app' (ou o nome que quiser)"
echo "   3. NÃO marque nenhuma opção (README, .gitignore etc)"
echo "   4. Clique em 'Create repository'"
echo "   5. Copie a URL HTTPS (ex: https://github.com/SEU-USUARIO/futebol-app.git)"
echo ""
read -p "Cole a URL HTTPS do repositório aqui: " repo_url

if [ -z "$repo_url" ]; then
  echo -e "${RED}❌ URL não informada. Abortando.${NC}"
  exit 1
fi

# Adiciona arquivos e faz commit
echo ""
echo -e "${GREEN}→ Adicionando arquivos...${NC}"
git add .

if git diff --cached --quiet; then
  echo -e "${YELLOW}Sem mudanças para commitar.${NC}"
else
  echo -e "${GREEN}→ Fazendo commit...${NC}"
  git commit -m "feat: aplicação react de futebol consumindo TheSportsDB"
fi

# Configura remote
if git remote get-url origin &> /dev/null; then
  echo -e "${YELLOW}→ Atualizando remote 'origin'...${NC}"
  git remote set-url origin "$repo_url"
else
  echo -e "${GREEN}→ Adicionando remote 'origin'...${NC}"
  git remote add origin "$repo_url"
fi

# Push
echo ""
echo -e "${GREEN}→ Enviando para o GitHub...${NC}"
echo -e "${YELLOW}(Pode pedir seu usuário/token do GitHub)${NC}"
git push -u origin main

echo ""
echo -e "${GREEN}✅ Push concluído!${NC}"
echo ""
echo -e "${BLUE}====================================${NC}"
echo -e "${BLUE}  PRÓXIMO PASSO: Deploy na Vercel  ${NC}"
echo -e "${BLUE}====================================${NC}"
echo ""
echo "1. Acesse: https://vercel.com/new"
echo "2. Faça login com GitHub (Continue with GitHub)"
echo "3. Encontre 'futebol-app' na lista e clique em 'Import'"
echo "4. NÃO mude nenhuma config — clique direto em 'Deploy'"
echo "5. Aguarde 1-2 minutos. Pronto, está no ar!"
echo ""
echo -e "${GREEN}Sua URL pública vai ser algo como:${NC}"
echo -e "${BLUE}   https://futebol-app-XXXX.vercel.app${NC}"
echo ""
echo -e "${YELLOW}Não esqueça de colar o link no README.md!${NC}"
