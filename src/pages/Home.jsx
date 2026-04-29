import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchTeams, _fallback } from '../services/api'
import TeamCard from '../components/TeamCard'
import Loading from '../components/Loading'

const FEATURED_TEAMS = ['Flamengo','Palmeiras','Corinthians','Sao Paulo','Real Madrid','Barcelona','Manchester United','Liverpool']
const FALLBACK_FEATURED_IDS = ['134303','134276','134307','134300','133738','133739','133612','133602']

function Home() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true)
        const results = await Promise.all(FEATURED_TEAMS.map((name) => searchTeams(name).catch(() => [])))
        const fromApi = results.map((arr) => (arr && arr[0]) || null).filter(Boolean)
        if (mounted) {
          if (fromApi.length > 0) setTeams(fromApi)
          else setTeams(FALLBACK_FEATURED_IDS.map((id) => _fallback.teams.find((t) => t.idTeam === id)).filter(Boolean))
        }
      } catch {
        if (mounted) setTeams(FALLBACK_FEATURED_IDS.map((id) => _fallback.teams.find((t) => t.idTeam === id)).filter(Boolean))
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <div>
      <section className="hero">
        <h1>Tudo de futebol em <span style={{ color: 'var(--color-primary)' }}>um só lugar</span></h1>
        <p>Explore ligas, times, jogadores e partidas do mundo todo. Dados consumidos da API pública TheSportsDB.</p>
        <div className="btn-row">
          <Link to="/ligas" className="btn">Explorar Ligas</Link>
          <Link to="/busca" className="btn btn-ghost">Buscar Time ou Jogador</Link>
        </div>
      </section>
      <h2 className="section-title">Times em destaque</h2>
      {loading ? <Loading message="Carregando..." /> : (
        <div className="grid">
          {teams.map((team) => <TeamCard key={team.idTeam} team={team} />)}
        </div>
      )}
    </div>
  )
}
export default Home
