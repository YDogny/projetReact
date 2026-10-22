import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Favoris from './pages/Favoris/Favoris.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App >
      {/*<Favoris />*/}
    </App>
  </StrictMode>,
)
