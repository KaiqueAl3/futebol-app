import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Leagues from './pages/Leagues'
import LeagueDetail from './pages/LeagueDetail'
import TeamDetail from './pages/TeamDetail'
import PlayerDetail from './pages/PlayerDetail'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ligas" element={<Leagues />} />
          <Route path="/liga/:id" element={<LeagueDetail />} />
          <Route path="/time/:id" element={<TeamDetail />} />
          <Route path="/jogador/:id" element={<PlayerDetail />} />
          <Route path="/busca" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">
          <p>
            ⚽ Futebol App © 2026 — Dados via{' '}
            <a href="https://www.thesportsdb.com" target="_blank" rel="noopener noreferrer">TheSportsDB</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
