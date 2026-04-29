#!/bin/bash
# ====================================================================
# Deploy automático no GitHub Pages — Futebol App
# ====================================================================
# O que este script faz:
#   1. Pergunta o seu usuário do GitHub e o nome do repositório
#   2. Inicializa o git e faz o primeiro commit (se ainda não foi feito)
#   3. Conecta ao repo no GitHub e faz o push da branch main
#   4. Roda 'npm install' (se preciso) e 'npm run deploy' (publica no Pages)
#   5. Mostra a URL final (https://USUARIO.github.io/REPO)
#
# REQUISITO: você precisa ter criado um repositório vazio no GitHub
#            antes de rodar este script.
# ====================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}  Deploy Futebol App no GitHub Pages ⚽ ${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

# Verifica git
if ! command -v git &> /dev/null; then
  echo -e "${RED}❌ Git não instalado. Instale em https://git-scm.com${NC}"
  exit 1
fi

# Verifica node/npm
if ! command -v npm &> /dev/null; then
  echo -e "${RED}❌ Node.js/npm não instalado. Instale em https://nodejs.org${NC}"
  exit 1
fi

echo -e "${YELLOW}📌 ANTES DE CONTINUAR — crie um repo no GitHub:${NC}"
echo "   1. Vá em https://github.com/new"
echo "   2. Repository name: futebol-app  (ou outro nome)"
echo "   3. Mantenha 'Public' marcado"
echo "   4. NÃO marque README/.gitignore/license — deixe vazio"
echo "   5. Clique em 'Create repository'"
echo ""
read -p "Já criou o repositório? (s/n): " ja_criou
if [ "$ja_criou" != "s" ]; then
  echo "Volte aqui depois de criar. Abortando."
  exit 0
fi

echo ""
read -p "Seu usuário do GitHub (ex: kaiquegr): " gh_user
read -p "Nome do repositório (ex: futebol-app): " gh_repo

if [ -z "$gh_user" ] || [ -z "$gh_repo" ]; then
  echo -e "${RED}❌ Usuário e repositório são obrigatórios.${NC}"
  exit 1
fi

repo_url="https://github.com/${gh_user}/${gh_repo}.git"
pages_url="https://${gh_user}.github.io/${gh_repo}"

echo ""
echo -e "${GREEN}→ Repositório: ${repo_url}${NC}"
echo -e "${GREEN}→ URL final:    ${pages_url}${NC}"
echo ""
read -p "Confirma? (s/n): " confirma
if [ "$confirma" != "s" ]; then
  echo "Abortando."
  exit 0
fi

# Etapa 1: Inicializa git e faz commit
if [ ! -d ".git" ]; then
  echo ""
  echo -e "${GREEN}→ Inicializando git...${NC}"
  git init
  git branch -M main
fi

echo ""
echo -e "${GREEN}→ Adicionando arquivos e fazendo commit...${NC}"
git add .
if git diff --cached --quiet; then
  echo -e "${YELLOW}Sem mudanças novas para commitar.${NC}"
else
  git commit -m "feat: aplicação react de futebol consumindo TheSportsDB"
fi

# Etapa 2: Configura remote e faz push
if git remote get-url origin &> /dev/null; then
  echo -e "${YELLOW}→ Atualizando remote 'origin'...${NC}"
  git remote set-url origin "$repo_url"
else
  echo -e "${GREEN}→ Adicionando remote 'origin'...${NC}"
  git remote add origin "$repo_url"
fi

echo ""
echo -e "${GREEN}→ Enviando código para o GitHub (branch main)...${NC}"
echo -e "${YELLOW}(Pode pedir seu usuário e Personal Access Token)${NC}"
git push -u origin main

# Etapa 3: Instala dependências (se preciso)
if [ ! -d "node_modules" ]; then
  echo ""
  echo -e "${GREEN}→ Instalando dependências (npm install)...${NC}"
  npm install
fi

# Etapa 4: Deploy no Pages
echo ""
echo -e "${GREEN}→ Publicando no GitHub Pages (npm run deploy)...${NC}"
echo -e "${YELLOW}(Faz o build e publica na branch gh-pages)${NC}"
npm run deploy

# Etapa 5: Mostra URL final
echo ""
echo -e "${BLUE}=========================================${NC}"
echo -e "${GREEN}✅ DEPLOY CONCLUÍDO!${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""
echo -e "${YELLOW}⚠️  ÚLTIMO PASSO MANUAL:${NC}"
echo "   1. Vá em https://github.com/${gh_user}/${gh_repo}/settings/pages"
echo "   2. Em 'Source' selecione: 'Deploy from a branch'"
echo "   3. Em 'Branch' selecione: 'gh-pages' / '/ (root)'"
echo "   4. Clique em 'Save'"
echo "   5. Aguarde 1-2 minutos para o GitHub publicar"
echo ""
echo -e "${GREEN}🌐 Sua URL pública vai ser:${NC}"
echo -e "${BLUE}   ${pages_url}${NC}"
echo ""
echo -e "${YELLOW}Não esqueça de colar essa URL no README.md depois!${NC}"
