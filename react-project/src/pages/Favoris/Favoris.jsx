import PostCard from '../../components/Posts/PostCard.jsx'
import { usePostsContext } from '../../context/PostsContext.jsx'
import styles from '../Feed/Feed.module.css'

export default function Favoris() {
  const { favorites } = usePostsContext()

  return (
    <main className={styles.feed}>
      <section className={styles.column} aria-label="Mes favoris">
        <div className={styles.heading}>
          <h1>Mes favoris</h1>
          <p className={styles.subtitle}>
            Retrouve les publications que tu as enregistrées.
          </p>
        </div>

        {favorites.length === 0 ? (
          <p className={styles.notice}>
            Tu n'as pas encore ajouté de publication aux favoris.
          </p>
        ) : (
          <div className={styles.posts}>
            {favorites.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
