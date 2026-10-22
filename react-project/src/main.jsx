import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { PostsProvider } from './context/PostsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PostsProvider >
        <App />
      </PostsProvider>
    </BrowserRouter>
  </StrictMode>,
)   