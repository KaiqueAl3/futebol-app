import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPlayerById } from '../services/api'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const formatDate = (s) => {
  if (!s) return '—'
  try { return new Date(s).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) } catch { return s }
}

function PlayerDetail() {
  const { id } = useParams()
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true); setError(null)
        const data = await getPlayerById(id)
        if (!data) { if (mounted) setError('Jogador não encontrado.') }
        else if (mounted) setPlayer(data)
      } catch { if (mounted) setError('Erro ao carregar.') }
      finally { if (mounted) setLoading(false) }
    }
    load()
    return () => { mounted = false }
  }, [id])

  if (loading) return <Loading message="Carregando jogador..." />
  if (error) return <ErrorMessage message={error} />
  if (!player) return null

  const photo = player.strThumb || player.strCutout || player.strRender || './favicon.svg'

  return (
    <div>
      <Link to="/busca" className="btn btn-ghost" style={{ marginBottom: '1rem' }}>← Voltar para Busca</Link>
      <div className="detail-header">
        <img src={photo} alt={player.strPlayer} onError={(e)=>{e.currentTarget.src='./favicon.svg'}} />
        <div className="info">
          <h1>{player.strPlayer}</h1>
          {player.strTeam && <p><strong>Clube atual:</strong> {player.strTeam}</p>}
          <div>
            {player.strNationality && <span className="tag">🌍 {player.strNationality}</span>}
            {player.strPosition && <span className="tag">⚽ {player.strPosition}</span>}
            {player.strSport && <span className="tag">{player.strSport}</span>}
          </div>
        </div>
      </div>
      <div className="detail-section">
        <h2>Dados Pessoais</h2>
        <div className="info-grid">
          {player.dateBorn && <div><strong>Nascimento</strong>{formatDate(player.dateBorn)}</div>}
          {player.strBirthLocation && <div><strong>Local</strong>{player.strBirthLocation}</div>}
          {player.strHeight && <div><strong>Altura</strong>{player.strHeight}</div>}
          {player.strWeight && <div><strong>Peso</strong>{player.strWeight}</div>}
          {player.strSide && <div><strong>Pé dominante</strong>{player.strSide}</div>}
          {player.strNumber && <div><strong>Número</strong>{player.strNumber}</div>}
        </div>
      </div>
      {player.strDescriptionEN && <div className="detail-section"><h2>Biografia</h2><p>{player.strDescriptionEN}</p></div>}
    </div>
  )
}
export default PlayerDetail
