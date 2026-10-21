import styles from './Posts.module.css'

export default function Posts({ post }) {
  return (
    <article className={styles.post}>
      <header className={styles.postHeader}>
        <span className={styles.avatar} aria-hidden="true">S</span>
        <div className={styles.author}>
          <strong>Utilisateur {post.userId}</strong>
        </div>
      </header>

      <div className={styles.content}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>

      {post.tags.length > 0 && (
        <ul className={styles.tags} aria-label="Tags">
          {post.tags.map((tag) => <li key={tag}>#{tag}</li>)}
        </ul>
      )}

      <footer className={styles.engagement}>
        <div className={styles.reactions}>
          {Object.entries(post.reactions).map(([key, value]) => (
            <span key={key}>
              <strong>{value}</strong> {key === 'likes' ? 'J’aime' : key}
            </span>
          ))}
        </div>
        <span className={styles.views}>{post.views} vues</span>
      </footer>
    </article>
  )
}