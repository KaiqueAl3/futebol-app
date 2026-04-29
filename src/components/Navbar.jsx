import { Link, NavLink } from 'react-router-dom'
function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">⚽ Futebol<span className="accent">App</span></Link>
        <nav className="nav-links">
          <NavLink to="/" end>Início</NavLink>
          <NavLink to="/ligas">Ligas</NavLink>
          <NavLink to="/busca">Busca</NavLink>
        </nav>
      </div>
    </header>
  )
}
export default Navbar
