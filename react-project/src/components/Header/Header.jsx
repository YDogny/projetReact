import styles from './Header.module.css'
import logo from '../../assets/Logo_no_BG.png'
import { useState } from 'react'

export default function Header() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  
  function handleSubmit(event) {
    event.preventDefault()
    setQuery(search.trim() || 'subject:fiction')
  }

  
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <a className={styles.brand} href="index.html" aria-label="SoFeed React, accueil">
          <img className={styles.logo} src={logo} alt="SoFeed React" />
        </a>
        <nav className={styles.navigation} aria-label="Navigation principale">
          <a className={styles.activeLink} href="index.html" aria-current="page">Accueil</a>
          <a className={styles.activeLink} href="favoris.html" aria-current="page">Favoris</a>

          <form className={styles.search} onSubmit={handleSubmit}>
            <input
              className={styles.searchInput}
              type="search"
              name="q"
              placeholder="Rechercher…"
              aria-label="Rechercher"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <button className={styles.searchButton} type="submit">Rechercher</button>
          </form>
        </nav>
      </div>
    </header>
  )
}
