import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPostById } from '../../api/postsApi.js'
import PostCard from '../../features/posts/PostCard.jsx'
import { normalizePost } from '../../features/posts/normalizePost.js'
import feedStyles from '../Feed/Feed.module.css'

export default function DetailsPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadPost() {
      setLoading(true)
      setError(null)
      setPost(null)

      try {
        const data = await fetchPostById(id)

        if (cancelled) {
          return
        }

        setPost(normalizePost(data))
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

    loadPost()

    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <main className={feedStyles.feed}>
      <section className={feedStyles.column} aria-label="Détail de la publication">
        <p><Link to="/">← Retour au fil d’actualité</Link></p>
        <div className={feedStyles.heading}>
          <h1>Détail de la publication</h1>
        </div>

        {loading && <p className={feedStyles.notice}>Chargement de la publication…</p>}
        {error && <p className={feedStyles.error} role="alert">{error}</p>}
        {!loading && !error && !post && (
          <p className={feedStyles.notice}>Publication introuvable.</p>
        )}

        {post && (
          <PostCard post={post} showDetailsLink={false} showMetrics />
        )}
      </section>
    </main>
  )
}
