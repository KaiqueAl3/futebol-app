import { Link } from 'react-router-dom'
function NotFound() {
  return (
    <div className="empty-state">
      <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>404</h1>
      <p style={{ marginBottom: '1.5rem' }}>Página não encontrada.</p>
      <Link to="/" className="btn">Voltar para Home</Link>
    </div>
  )
}
export default NotFound
