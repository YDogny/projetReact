import FabForm from '../../components/FabForm/FabForm.jsx'
import PostCard from '../../components/Posts/PostCard.jsx'
import PostSkeleton from '../../components/Posts/PostSkeleton.jsx'
import { createPost, fetchPosts } from '../../api/postsApi.js'
import { normalizePost } from '../../features/posts/normalizePost.js'
import { useEffect, useState } from 'react'
import styles from './Feed.module.css'
import { usePostsContext } from '../../context/PostsContext.jsx'
import FeedFilters from '../../components/FeedFilters/FeedFilters.jsx'
import Pagination from '../../components/Pagination/Pagination.jsx'

const POSTS_PER_PAGE = 10

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const {search, selectedTag, minLikes, page, setPage} = usePostsContext()

  const filteredPosts = posts.filter((post) => {
    const query = search.trim().toLowerCase()

    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)

    const matchesTag =
      selectedTag === '' ||
      post.tags.includes(selectedTag)

    const matchesLikes =
      minLikes === 'all' ||
      post.reactions.likes >= Number(minLikes)

    return matchesSearch && matchesTag && matchesLikes
  })

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  )

  const currentPage = Math.min(page, totalPages)

  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const availableTags = [...new Set(posts.flatMap((post) => post.tags))].sort()

  async function handlePostCreated(postData) {
    const createdPost = await createPost(postData)
    setPosts((currentPosts) => [normalizePost(createdPost), ...currentPosts])
    setPage(1)
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

  function changePage(newPage) {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className={styles.feed}>
    <div className={styles.layout}>
        <section className={styles.column} aria-label="Fil d’actualité">
          <div className={styles.heading}>
            <p className={styles.eyebrow}>SoFeed React</p>
            <h1>Fil d’actualité</h1>
            <p className={styles.subtitle}>Les idées et publications de la communauté.</p>
          </div>

          <FeedFilters availableTags={availableTags} />

          {loading && <p className={styles.visuallyHidden} role="status">Chargement des publications…</p>}
          {error && <p className={styles.error} role="alert">{error}</p>}
          {!loading && !error && filteredPosts.length === 0 && (
            <p className={styles.notice}>
              Aucune publication ne correspond à ta recherche.
            </p>
          )}

          <div className={styles.posts} aria-busy={loading}>
            {loading
              ? <PostSkeleton />
              : !error && visiblePosts.map((post) => (
                  <PostCard key={post.id} post={post} />
            ))}
          </div>

          {!loading && !error && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={changePage}
            />
          )}

        </section>

        <aside className={styles.sidebar} aria-label="Créer une publication">
          <FabForm onPostCreated={handlePostCreated} />
        </aside>
      </div>
    </main>
  )
}
