import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li><a href="index.html" aria-current="page">Feed</a></li>
        </ul>
      </nav>
    </header>
  )
}
