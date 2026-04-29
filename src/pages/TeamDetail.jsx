import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTeamById, getNextEventsByTeam, getLastEventsByTeam } from '../services/api'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const formatDate = (s) => {
  if (!s) return '—'
  try { return new Date(s).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) } catch { return s }
}

function TeamDetail() {
  const { id } = useParams()
  const [team, setTeam] = useState(null)
  const [next, setNext] = useState([])
  const [last, setLast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true); setError(null)
        const teamData = await getTeamById(id)
        if (!teamData) { if (mounted) { setError('Time não encontrado.'); setLoading(false) }; return }
        if (mounted) setTeam(teamData)
        const [n, l] = await Promise.all([getNextEventsByTeam(id).catch(() => []), getLastEventsByTeam(id).catch(() => [])])
        if (mounted) { setNext(n); setLast(l) }
      } catch { if (mounted) setError('Erro ao carregar o time.') }
      finally { if (mounted) setLoading(false) }
    }
    load()
    return () => { mounted = false }
  }, [id])

  if (loading) return <Loading message="Carregando time..." />
  if (error) return <ErrorMessage message={error} />
  if (!team) return null

  const badge = team.strBadge || team.strTeamBadge || './favicon.svg'

  return (
    <div>
      <Link to="/" className="btn btn-ghost" style={{ marginBottom: '1rem' }}>← Voltar</Link>
      <div className="detail-header">
        <img src={badge} alt={team.strTeam} onError={(e)=>{e.currentTarget.src='./favicon.svg'}} />
        <div className="info">
          <h1>{team.strTeam}</h1>
          {team.strLeague && (
            <p><strong>Liga:</strong>{' '}
              {team.idLeague ? <Link to={`/liga/${team.idLeague}`} style={{ color: 'var(--color-primary)' }}>{team.strLeague}</Link> : team.strLeague}
            </p>
          )}
          <div>
            {team.strCountry && <span className="tag">{team.strCountry}</span>}
            {team.intFormedYear && <span className="tag">Fundado em {team.intFormedYear}</span>}
            {team.strStadium && <span className="tag">🏟️ {team.strStadium}</span>}
          </div>
        </div>
      </div>
      <div className="detail-section">
        <h2>Informações</h2>
        <div className="info-grid">
          {team.strManager && <div><strong>Técnico</strong>{team.strManager}</div>}
          {team.strStadium && <div><strong>Estádio</strong>{team.strStadium}</div>}
          {team.intStadiumCapacity && <div><strong>Capacidade</strong>{Number(team.intStadiumCapacity).toLocaleString('pt-BR')}</div>}
          {team.strStadiumLocation && <div><strong>Localização</strong>{team.strStadiumLocation}</div>}
          {team.strWebsite && <div><strong>Site</strong><a href={`https://${team.strWebsite}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>{team.strWebsite}</a></div>}
        </div>
      </div>
      {team.strDescriptionEN && <div className="detail-section"><h2>Sobre o clube</h2><p>{team.strDescriptionEN}</p></div>}
      <div className="detail-section">
        <h2>Próximas partidas</h2>
        {next.length === 0 ? <p style={{ color: 'var(--color-text-muted)' }}>Nenhuma partida disponível.</p> : next.map((ev) => (
          <div key={ev.idEvent} className="match-card">
            <span className="teams">{ev.strHomeTeam} <span style={{ color: 'var(--color-text-muted)' }}>vs</span> {ev.strAwayTeam}</span>
            <span className="date">{formatDate(ev.dateEvent)}</span>
          </div>
        ))}
      </div>
      <div className="detail-section">
        <h2>Últimos resultados</h2>
        {last.length === 0 ? <p style={{ color: 'var(--color-text-muted)' }}>Sem resultados disponíveis.</p> : last.map((ev) => (
          <div key={ev.idEvent} className="match-card">
            <span className="teams">{ev.strHomeTeam} <span className="score">{ev.intHomeScore ?? '-'} : {ev.intAwayScore ?? '-'}</span> {ev.strAwayTeam}</span>
            <span className="date">{formatDate(ev.dateEvent)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default TeamDetail
