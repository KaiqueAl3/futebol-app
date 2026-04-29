import { Link } from 'react-router-dom'
function PlayerCard({ player }) {
  const photo = player.strThumb || player.strCutout || player.strRender || './favicon.svg'
  return (
    <Link to={`/jogador/${player.idPlayer}`} className="card">
      <img src={photo} alt={player.strPlayer} className="badge-img" onError={(e)=>{e.currentTarget.src='./favicon.svg'}} />
      <h3>{player.strPlayer}</h3>
      <p className="meta">{player.strTeam || 'Sem clube'}{player.strPosition ? ` · ${player.strPosition}` : ''}</p>
    </Link>
  )
}
export default PlayerCard
