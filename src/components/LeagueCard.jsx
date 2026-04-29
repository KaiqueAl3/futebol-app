import { Link } from 'react-router-dom'
function LeagueCard({ league }) {
  return (
    <Link to={`/liga/${league.idLeague}`} className="card">
      <div style={{
        width: 90, height: 90, margin: '0 auto 1rem', borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(0,179,65,0.25), rgba(255,214,10,0.18))',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
      }}>🏆</div>
      <h3>{league.strLeague}</h3>
      <p className="meta">{league.strLeagueAlternate || league.strCountry || 'Liga de futebol'}</p>
    </Link>
  )
}
export default LeagueCard
