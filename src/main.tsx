import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const VALID_PARAM = 'alfa_guest'
const EXPIRATION_TIME = 24 * 60 * 60 * 1000
const REDIRECT_URL = 'https://alfaplazahotel.com.br/'

const runSecurityProtocol = () => {
  const params = new URLSearchParams(window.location.search)
  const grant = params.get('access')
  const session = localStorage.getItem('mordomo_session')
  const now = Date.now()

  if (grant === VALID_PARAM) {
    localStorage.setItem('mordomo_session', now.toString())
    window.history.replaceState({}, '', `${window.location.pathname}${window.location.hash}`)
    return true
  }

  if (session) {
    const parsed = Number.parseInt(session, 10)
    if (!Number.isFinite(parsed) || now - parsed > EXPIRATION_TIME) {
      localStorage.removeItem('mordomo_session')
      window.location.href = REDIRECT_URL
      return false
    }
    return true
  }

  window.location.href = REDIRECT_URL
  return false
}

if (runSecurityProtocol()) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
