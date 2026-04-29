# ⚽ Futebol App

Aplicação web desenvolvida em **React** que consome a API pública **TheSportsDB** para exibir ligas, times, jogadores e partidas de futebol do mundo todo.


## 🌐 Link do site

🔗 **Acesse aqui:** https://KaiqueAl3.github.io/futebol-app


---

## 📸 Prints Do Site

| 🏠 Página inicial 

| 🏆 Ligas 

| 📋 Detalhe da Liga 

| ⚽ Detalhe do Time 

| 👤 Detalhe do Jogador 

| 🔍 Página de Busca 



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


## 👨‍💻 Autor

**Kaique Alencar**

