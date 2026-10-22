import FabForm from '../../components/FabForm/FabForm.jsx'
import PostCard from '../../components/Posts/PostCard.jsx'
import PostSkeleton from '../../components/Posts/PostSkeleton.jsx'
import { createPost, fetchPosts } from '../../api/postsApi.js'
import { normalizePost } from '../../features/posts/normalizePost.js'
import { useEffect, useState } from 'react'
import styles from './Feed.module.css'
import { usePostsContext } from '../../context/PostsContext.jsx'

const POSTS_PER_PAGE = 10

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const {search, updateSearch, selectedTag, updateSelectedTag, minLikes, updateMinLikes, page, setPage} = usePostsContext()

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

        <div className={styles.filters}>
          <label htmlFor="search-posts">
            Rechercher une publication
          </label>

          <input
            id="search-posts"
            type="search"
            placeholder="Rechercher dans les titres et contenus"
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
          />

          <label htmlFor="filter-tag">
            Filtrer par tag
          </label>

          <select
            id="filter-tag"
            value={selectedTag}
            onChange={(e) => updateSelectedTag(e.target.value)}
          >
            <option value="">Tous les tags</option>

            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <label htmlFor="filter-likes">
            Nombre minimum de likes
          </label>

          <select
            id="filter-likes"
            value={minLikes}
            onChange={(e) => updateMinLikes(e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="10">10 likes minimum</option>
            <option value="50">50 likes minimum</option>
            <option value="100">100 likes minimum</option>
          </select>
        </div>


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

        {!loading && !error && totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              Précédent
            </button>

            <span>
              Page {currentPage} sur {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              Suivant
            </button>
          </nav>
        )}

        <FabForm onPostCreated={handlePostCreated} />
      </section>
    </main>
  )
}
