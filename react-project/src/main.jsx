import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Feed from './components/Feed/Feed.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App >
      <Feed />
    </App>
  </StrictMode>,
)
