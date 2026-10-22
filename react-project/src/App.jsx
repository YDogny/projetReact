import { Routes, Route } from 'react-router-dom'
import Feed from './pages/Feed/Feed.jsx'
import Favoris from './pages/Favoris/Favoris.jsx'
import Detail from './pages/DetailsPost/DetailsPost.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import './App.css'

export default function App() {
  return (
    <div className="appShell">
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </div>
  )
}
