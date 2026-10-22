import { Link } from 'react-router-dom'
import styles from './Posts.module.css'

export default function PostCard({ post, showDetailsLink = true, showMetrics = false }) {
  return (
    <article className={styles.post}>
      <header className={styles.postHeader}>
        <img
          className={styles.avatar}
          src={post.img}
          alt=""
          aria-hidden="true"
          width="40"
          height="40"
          loading="lazy"
          decoding="async"
        />
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

      {(showDetailsLink || showMetrics) && (
        <footer className={styles.engagement}>
          {showMetrics && (
            <>
              <div className={styles.reactions}>
                {Object.entries(post.reactions).map(([key, value]) => (
                  <span key={key}>
                    <strong>{value}</strong> {key === 'likes' ? 'J’aime' : key}
                  </span>
                ))}
              </div>
              <span className={styles.views}>{post.views} vues</span>
            </>
          )}
          {showDetailsLink && <Link to={`/detail/${post.id}`}>Voir plus</Link>}
        </footer>
      )}
    </article>
  )
}
