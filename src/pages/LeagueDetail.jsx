import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getLeagueById, getTeamsByLeague } from '../services/api'
import TeamCard from '../components/TeamCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function LeagueDetail() {
  const { id } = useParams()
  const [league, setLeague] = useState(null)
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true); setError(null)
        const leagueData = await getLeagueById(id)
        if (!leagueData) { if (mounted) { setError('Liga não encontrada.'); setLoading(false) }; return }
        if (mounted) setLeague(leagueData)
        const teamsData = await getTeamsByLeague(leagueData.strLeague)
        if (mounted) setTeams(teamsData)
      } catch { if (mounted) setError('Erro ao carregar a liga.') }
      finally { if (mounted) setLoading(false) }
    }
    load()
    return () => { mounted = false }
  }, [id])

  if (loading) return <Loading message="Carregando liga..." />
  if (error) return <ErrorMessage message={error} />
  if (!league) return null

  const banner = league.strBadge || league.strLogo || './favicon.svg'

  return (
    <div>
      <Link to="/ligas" className="btn btn-ghost" style={{ marginBottom: '1rem' }}>← Voltar para Ligas</Link>
      <div className="detail-header">
        <img src={banner} alt={league.strLeague} onError={(e)=>{e.currentTarget.src='./favicon.svg'}} />
        <div className="info">
          <h1>{league.strLeague}</h1>
          {league.strLeagueAlternate && <p>{league.strLeagueAlternate}</p>}
          <div>
            {league.strCountry && <span className="tag">{league.strCountry}</span>}
            {league.strSport && <span className="tag">{league.strSport}</span>}
            {league.intFormedYear && <span className="tag">Desde {league.intFormedYear}</span>}
          </div>
        </div>
      </div>
      {league.strDescriptionEN && (
        <div className="detail-section"><h2>Sobre a liga</h2><p>{league.strDescriptionEN}</p></div>
      )}
      <h2 className="section-title">Times da liga ({teams.length})</h2>
      {teams.length === 0 ? (
        <div className="empty-state">Nenhum time encontrado.</div>
      ) : (
        <div className="grid">{teams.map((team) => <TeamCard key={team.idTeam} team={team} />)}</div>
      )}
    </div>
  )
}
export default LeagueDetail
