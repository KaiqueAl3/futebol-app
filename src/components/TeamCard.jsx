import { Link } from 'react-router-dom'
function TeamCard({ team }) {
  const badge = team.strBadge || team.strTeamBadge || './favicon.svg'
  return (
    <Link to={`/time/${team.idTeam}`} className="card">
      <img src={badge} alt={team.strTeam} className="badge-img" onError={(e)=>{e.currentTarget.src='./favicon.svg'}} />
      <h3>{team.strTeam}</h3>
      <p className="meta">{team.strCountry || '—'}{team.intFormedYear ? ` · Fundado em ${team.intFormedYear}` : ''}</p>
    </Link>
  )
}
export default TeamCard
