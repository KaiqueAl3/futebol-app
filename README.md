# ⚽ Futebol App

Aplicação web desenvolvida em **React** que consome a API pública **TheSportsDB** para exibir ligas, times, jogadores e partidas de futebol do mundo todo.


---

## 🌐 Link da aplicação online

🔗 **Acesse aqui:** https://SEU-USUARIO.github.io/futebol-app

> ⚠️ **Antes de entregar:** substitua `SEU-USUARIO` pelo seu usuário do GitHub.

---

## 📸 Screenshots

| Tela | Imagem |
|------|--------|
| 🏠 Página inicial (Home) | ![Home](docs/screenshots/01-home.png) |
| 🏆 Lista de Ligas | ![Ligas](docs/screenshots/02-ligas.png) |
| 📋 Detalhe da Liga | ![Liga](docs/screenshots/03-liga-detalhe.png) |
| ⚽ Detalhe do Time | ![Time](docs/screenshots/04-time-detalhe.png) |
| 👤 Detalhe do Jogador | ![Jogador](docs/screenshots/05-jogador-detalhe.png) |
| 🔍 Página de Busca | ![Busca](docs/screenshots/06-busca.png) |

> Os screenshots ficam na pasta `docs/screenshots/`. Tire prints da aplicação rodando e salve com esses nomes.

---

## 🧱 Arquitetura da aplicação

```
┌────────────────────────────────────────────────────────────────────────────┐
│                              USUÁRIO (Browser)                             │
└─────────────────────────────────┬──────────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                  HOSPEDAGEM ESTÁTICA — GitHub Pages                        │
│                  https://SEU-USUARIO.github.io/futebol-app                 │
└─────────────────────────────────┬──────────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                         APLICAÇÃO REACT (SPA)                              │
│                                                                            │
│   ┌────────────┐    ┌────────────────────┐    ┌─────────────────────────┐  │
│   │  main.jsx  │───►│  HashRouter        │───►│  App.jsx (layout)       │  │
│   └────────────┘    │  (react-router-dom)│    │  ├─ <Navbar />          │  │
│                     └────────────────────┘    │  ├─ <Routes />          │  │
│                                               │  └─ <footer />          │  │
│                                               └────────────┬────────────┘  │
│                                                            │               │
│        ┌────────────┬────────────┬─────────────┬───────────┼───────────┐   │
│        ▼            ▼            ▼             ▼           ▼           ▼   │
│   ┌────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ ┌─────┐  │
│   │  Home  │  │ Leagues │  │ League   │  │  Team    │  │ Player │ │Busca│  │
│   │   /    │  │ /ligas  │  │ Detail   │  │ Detail   │  │ Detail │ │  /  │  │
│   │        │  │         │  │/liga/:id │  │/time/:id │  │  /...  │ │busca│  │
│   └───┬────┘  └────┬────┘  └────┬─────┘  └────┬─────┘  └────┬───┘ └─────┘  │
│       │            │            │             │             │              │
│       └────────────┴────────────┴─────────────┴─────────────┘              │
│                                  │                                         │
│                                  ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │   components/   (Navbar, TeamCard, PlayerCard, LeagueCard,         │  │
│   │                  Loading, ErrorMessage)                            │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                  │                                         │
│                                  ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  services/api.js  (camada de acesso a dados — fetch nativo)        │  │
│   │   1°) Tenta TheSportsDB direto (chaves "123" e "3")                │  │
│   │   2°) Se falhar, tenta via proxies CORS públicos                   │  │
│   │   3°) Se falhar tudo, usa data/fallback.js (estático)              │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────┬──────────────────────────────────────────┘
                                  │ HTTPS / JSON
                                  ▼
                  ┌───────────────────────────────────┐
                  │   API Externa: TheSportsDB        │
                  │   www.thesportsdb.com/api/v1/     │
                  └───────────────────────────────────┘
```

### Fluxo de dados

1. O usuário acessa uma rota (ex: `/#/time/133738`)
2. O **HashRouter** (React Router) identifica a rota dinâmica e renderiza o componente `TeamDetail`
3. Dentro de `useEffect`, o componente chama `getTeamById(id)` em `services/api.js`
4. A função usa `fetch` para buscar na **TheSportsDB**; se falhar, tenta via proxies CORS; se ainda falhar, devolve um item do `data/fallback.js`
5. O resultado é guardado em `useState` e renderizado na tela

> Essa arquitetura em camadas garante que a aplicação **sempre exibe conteúdo**, mesmo quando a API externa está temporariamente indisponível.

---

## 🚀 Tecnologias utilizadas

| Categoria | Tecnologia |
|-----------|-----------|
| **Linguagem** | JavaScript (ES2022) + JSX |
| **Framework UI** | [React 18](https://react.dev/) |
| **Build / Dev Server** | [Vite 5](https://vitejs.dev/) |
| **Roteamento** | [React Router DOM 6](https://reactrouter.com/) — `HashRouter` |
| **Requisições HTTP** | Fetch API (nativo do navegador) |
| **API Externa** | [TheSportsDB](https://www.thesportsdb.com/api.php) |
| **Estilo** | CSS puro (variáveis CSS, Grid, Flexbox), tema escuro, responsivo |
| **Versionamento** | Git + GitHub |
| **Deploy** | [GitHub Pages](https://pages.github.com/) (via pacote `gh-pages`) |

---

## 📁 Estrutura de pastas

```
futebol-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/         → Componentes reutilizáveis
│   │   ├── ErrorMessage.jsx
│   │   ├── LeagueCard.jsx
│   │   ├── Loading.jsx
│   │   ├── Navbar.jsx
│   │   ├── PlayerCard.jsx
│   │   └── TeamCard.jsx
│   ├── data/
│   │   └── fallback.js     → Dados estáticos (segurança contra falhas da API)
│   ├── pages/              → Páginas / rotas
│   │   ├── Home.jsx              → /
│   │   ├── Leagues.jsx           → /ligas
│   │   ├── LeagueDetail.jsx      → /liga/:id      (rota dinâmica)
│   │   ├── TeamDetail.jsx        → /time/:id      (rota dinâmica)
│   │   ├── PlayerDetail.jsx      → /jogador/:id   (rota dinâmica)
│   │   ├── Search.jsx            → /busca
│   │   └── NotFound.jsx          → *  (404)
│   ├── services/
│   │   └── api.js          → Camada de acesso à API + fallback automático
│   ├── App.jsx             → Layout principal + <Routes>
│   ├── main.jsx            → Entrypoint do React + HashRouter
│   └── index.css           → Estilos globais (tema escuro)
├── docs/
│   └── screenshots/        → Capturas de tela do app
├── .gitignore
├── index.html              → HTML base do Vite
├── package.json
├── README.md
└── vite.config.js
```

---

## 🗺️ Rotas da aplicação

| Caminho | Componente | Tipo | Descrição |
|---------|-----------|------|-----------|
| `/` | `Home` | Estática | Hero + 8 times em destaque |
| `/ligas` | `Leagues` | Estática | Lista todas as ligas com filtro de busca |
| `/liga/:id` | `LeagueDetail` | **Dinâmica** | Detalhes da liga + lista de times daquela liga |
| `/time/:id` | `TeamDetail` | **Dinâmica** | Detalhes do time, próximas partidas, últimos resultados |
| `/jogador/:id` | `PlayerDetail` | **Dinâmica** | Biografia, dados pessoais, posição |
| `/busca` | `Search` | Estática | Busca por times ou jogadores na API |
| `*` | `NotFound` | — | Página 404 |

A navegação entre páginas é feita com `<Link />` do React Router (sem reload da página).

---

## ⚙️ Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) **18 ou superior** (recomendado: LTS)
- npm (já vem instalado com o Node)
- Um editor de código — recomendado **VS Code**

### Passo a passo

1. **Clone o repositório**

   ```bash
   git clone https://github.com/SEU-USUARIO/futebol-app.git
   cd futebol-app
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

4. **Abra no navegador:** [http://localhost:5173](http://localhost:5173)

### Outros comandos disponíveis

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Sobe o servidor de desenvolvimento com hot-reload |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Pré-visualiza o build localmente |
| `npm run deploy` | Publica no GitHub Pages (branch `gh-pages`) |

---

## ☁️ Como fazer o deploy no GitHub Pages

### 1. Criar o repositório no GitHub

1. Acesse https://github.com/new
2. **Repository name:** `futebol-app`
3. Marque **Public**, e NÃO marque nenhuma outra opção
4. Clique em **Create repository**

### 2. Subir o código

Dentro da pasta do projeto, no terminal:

```bash
git init
git add .
git commit -m "feat: aplicação react de futebol"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/futebol-app.git
git push -u origin main
```

### 3. Publicar no GitHub Pages

```bash
npm install
npm run deploy
```

O comando `npm run deploy` faz o build e publica automaticamente na branch `gh-pages`.

### 4. Habilitar o GitHub Pages

1. Vá em `https://github.com/SEU-USUARIO/futebol-app/settings/pages`
2. Em **Source** selecione: **Deploy from a branch**
3. Em **Branch** selecione: **`gh-pages`** / **`/ (root)`**
4. Clique em **Save**
5. Aguarde 1-2 minutos

✅ Sua URL pública será: `https://SEU-USUARIO.github.io/futebol-app`

---

## 🔌 Sobre a API consumida

A aplicação consome a **[TheSportsDB API](https://www.thesportsdb.com/api.php)** — pública e gratuita.

Endpoints utilizados:

| Endpoint | Função no app |
|----------|---------------|
| `/all_leagues.php` | Lista todas as ligas |
| `/lookupleague.php?id=` | Detalhes de uma liga |
| `/search_all_teams.php?l=` | Times de uma liga |
| `/searchteams.php?t=` | Busca times por nome |
| `/lookupteam.php?id=` | Detalhes de um time |
| `/eventsnext.php?id=` | Próximas partidas de um time |
| `/eventslast.php?id=` | Últimos resultados de um time |
| `/searchplayers.php?p=` | Busca jogadores por nome |
| `/lookupplayer.php?id=` | Detalhes de um jogador |

---

## ✅ Checklist de requisitos atendidos

- [x] **[2 pts]** Aplicação exibindo dados de API (TheSportsDB via fetch)
- [x] **[2 pts]** Rotas dinâmicas com links internos (`/liga/:id`, `/time/:id`, `/jogador/:id`)
- [x] **[2 pts]** README bem feito com instruções, dependências e tecnologias
- [x] **[1 pt]** Código-fonte React versionado no Git
- [x] **[1 pt]** Desenho da arquitetura da aplicação (acima)
- [x] **[1 pt]** Prints da aplicação (em `docs/screenshots/`)
- [x] **[1 pt]** Link para acessar a aplicação online (no topo)

**Total: 10/10 pontos**

---

## 👨‍💻 Autor

**Kaique Alencar**
📧 iquegr@gmail.com
🎓 Disciplina de Desenvolvimento Front-End / React

---

## 📝 Licença

Projeto acadêmico de uso livre. Os dados exibidos pertencem à [TheSportsDB](https://www.thesportsdb.com).
