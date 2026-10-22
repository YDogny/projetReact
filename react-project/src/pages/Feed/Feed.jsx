import FabForm from '../../components/FabForm/FabForm.jsx'
import { createPost, fetchPosts } from '../../api/postsApi.js'
import PostCard from '../../features/posts/PostCard.jsx'
import { normalizePost } from '../../features/posts/normalizePost.js'
import PostSkeleton from '../../features/posts/PostSkeleton.jsx'
import { useEffect, useState } from 'react'
import styles from './Feed.module.css'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  async function handlePostCreated(postData) {
    const createdPost = await createPost(postData)
    setPosts((currentPosts) => [normalizePost(createdPost), ...currentPosts])
  }

  useEffect(() => {
    let cancelled = false

    async function loadPosts() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchPosts()
        if (!cancelled) {
          setPosts(data.map(normalizePost))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erreur inconnue')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadPosts()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className={styles.feed}>
      <section className={styles.column} aria-label="Fil d’actualité">
        <div className={styles.heading}>
          <p className={styles.eyebrow}>SoFeed React</p>
          <h1>Fil d’actualité</h1>
          <p className={styles.subtitle}>Les idées et publications de la communauté.</p>
        </div>

        {loading && <p className={styles.visuallyHidden} role="status">Chargement des publications…</p>}
        {error && <p className={styles.error} role="alert">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className={styles.notice}>Aucune publication à afficher pour le moment.</p>
        )}

        <div className={styles.posts} aria-busy={loading}>
          {loading
            ? <PostSkeleton />
            : posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>

        <FabForm onPostCreated={handlePostCreated} />
      </section>
    </main>
  )
}
