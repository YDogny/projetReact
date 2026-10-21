import Posts from "../../components/Posts/Posts.jsx"
import { readPosts } from '../../api/dummyJSON.js'
import { useEffect, useState } from 'react'

export default function Feed() {


  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)





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
    <main>
        <section>
          {loading && <p>Chargement des posts…</p>}
          {error && <p role="alert">{error}</p>}
          {posts.map((post) => (
            <article key={post.id}>
                <Posts post={post} />
            </article>
          ))}
        </section>
    </main>
  )
}
