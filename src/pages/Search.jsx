import { useState } from 'react'
import { searchTeams, searchPlayers, _fallback } from '../services/api'
import TeamCard from '../components/TeamCard'
import PlayerCard from '../components/PlayerCard'
import Loading from '../components/Loading'

function Search() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('team')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true); setSearched(true)
    try {
      const data = type === 'team' ? await searchTeams(query.trim()) : await searchPlayers(query.trim())
      setResults(data.filter((it) => (it.strSport || 'Soccer').toLowerCase() === 'soccer'))
    } catch { setResults([]) }
    finally { setLoading(false) }
  }

  const suggestions = type === 'team' ? _fallback.teams.slice(0, 8) : _fallback.players

  return (
    <div>
      <h1 className="section-title">Buscar</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => { setType(e.target.value); setResults([]); setSearched(false) }}>
          <option value="team">Time</option>
          <option value="player">Jogador</option>
        </select>
        <input type="text" placeholder={type === 'team' ? 'Nome do time (ex: Flamengo)' : 'Nome do jogador (ex: Messi)'} value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit" className="btn">Buscar</button>
      </form>
      {loading && <Loading message="Buscando..." />}
      {!loading && searched && results.length === 0 && (
        <div className="empty-state">Nenhum resultado para "<strong>{query}</strong>".</div>
      )}
      {!loading && results.length > 0 && (
        <>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{results.length} resultado(s).</p>
          <div className="grid">
            {type === 'team'
              ? results.map((t) => <TeamCard key={t.idTeam} team={t} />)
              : results.map((p) => <PlayerCard key={p.idPlayer} player={p} />)}
          </div>
        </>
      )}
      {!loading && !searched && (
        <>
          <h2 className="section-title">{type === 'team' ? 'Times populares' : 'Jogadores populares'}</h2>
          <div className="grid">
            {type === 'team'
              ? suggestions.map((t) => <TeamCard key={t.idTeam} team={t} />)
              : suggestions.map((p) => <PlayerCard key={p.idPlayer} player={p} />)}
          </div>
        </>
      )}
    </div>
  )
}
export default Search
