import Posts from "../../components/Posts/Posts.jsx"
import FabForm from "../../components/FabForm/FabForm.jsx"
import { readPosts } from '../../api/dummyJSON.js'
import { useEffect, useState } from 'react'
import styles from './Feed.module.css'

export default function Feed() {


  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  //==========
  function handlePostCreated(post) {
    const formattedPost = {
      id: post.id,
      title: post.title ?? 'Titre inconnu',
      body: post.body ?? 'Contenu inconnu',
      tags: post.tags ?? [],
      reactions: post.reactions ?? { likes: 0, dislikes: 0 },
      views: post.views ?? 0,
      userId: post.userId ?? 0,
    }

    setPosts((currentPosts) => [formattedPost, ...currentPosts])
  }
  //==================

  useEffect(() => {
    async function loadPosts() {
        setLoading(true)
        setError(null)

        try {
          const data = await readPosts()
          const results = data.posts ?? []
          const formattedPosts = results.map((post) => ({
            id: post.id,
            title: post.title ?? 'Titre inconnu',
            body: post.body ?? 'Contenu inconnu',
            tags: post.tags ?? [],
            reactions: post.reactions ?? {"likes": 0, "dislikes": 0},
            views: post.views ?? 0,
            userId: post.userId ?? 0,
          }))

          setPosts(formattedPosts)
        } catch (err) {

          setError(err instanceof Error ? err.message : 'Erreur inconnue')

        } finally {

          setLoading(false)
        }

    }
    loadPosts()
  }, [])


  return (
    <main className={styles.feed}>
      <section className={styles.column} aria-label="Fil d’actualité">
        <header className={styles.heading}>
          <p className={styles.eyebrow}>SoFeed React</p>
          <h1>Fil d’actualité</h1>
          <p className={styles.subtitle}>Les idées et publications de la communauté.</p>
        </header>

        {loading && <p className={styles.notice}>Chargement des publications…</p>}
        {error && <p className={styles.error} role="alert">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className={styles.notice}>Aucune publication à afficher pour le moment.</p>
        )}

        <div className={styles.posts}>
          {posts.map((post) => <Posts key={post.id} post={post} />)}
        </div>
        
{/*================================================*/}
        <FabForm onPostCreated={handlePostCreated} />
      </section>
    </main>
  )
}
