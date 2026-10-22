import styles from './Header.module.css'
import logo from '../../assets/Logo_no_BG.webp'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link className={styles.brand} to="/" aria-label="SoFeed React, accueil">
          <img className={styles.logo} src={logo} alt="SoFeed React" />
        </Link>
        <nav className={styles.navigation} aria-label="Navigation principale">
          <Link className={styles.activeLink} to="/">Accueil</Link>
          <Link className={styles.activeLink} to="/favoris">Favoris</Link>
        </nav>
      </div>
    </header>
  )
}
