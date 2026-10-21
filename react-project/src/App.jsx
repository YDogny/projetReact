import './App.css'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

export default function App({ children, showHeader = true }) {

  return (
    <div className="appShell">
      {showHeader && <Header />}
      {children}
      <Footer />
    </div>
  )
}
