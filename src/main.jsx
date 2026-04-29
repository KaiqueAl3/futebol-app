import React from 'react'
import ReactDOM from 'react-dom/client'
// HashRouter funciona em qualquer hospedagem estática (incluindo GitHub Pages)
// sem precisar configurar fallback no servidor — as rotas viram /#/rota.
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
