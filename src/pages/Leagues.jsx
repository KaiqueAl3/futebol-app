import { useEffect, useMemo, useState } from 'react'
import { getSoccerLeagues } from '../services/api'
import LeagueCard from '../components/LeagueCard'
import Loading from '../components/Loading'

function Leagues() {
  const [leagues, setLeagues] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    let mounted = true
    getSoccerLeagues().then((data) => mounted && setLeagues(data)).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  const filtered = useMemo(() => {
    if (!filter.trim()) return leagues
    const q = filter.trim().toLowerCase()
    return leagues.filter((l) =>
      l.strLeague.toLowerCase().includes(q) ||
      l.strLeagueAlternate?.toLowerCase().includes(q) ||
      l.strCountry?.toLowerCase().includes(q)
    )
  }, [leagues, filter])

  return (
    <div>
      <h1 className="section-title">Ligas de Futebol</h1>
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Filtrar (ex: Premier, Brasileirão...)" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </form>
      {loading ? <Loading message="Carregando ligas..." /> : filtered.length === 0 ? (
        <div className="empty-state">Nenhuma liga encontrada.</div>
      ) : (
        <>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{filtered.length} liga(s) disponível(is).</p>
          <div className="grid grid-wide">
            {filtered.map((league) => <LeagueCard key={league.idLeague} league={league} />)}
          </div>
        </>
      )}
    </div>
  )
}
export default Leagues
