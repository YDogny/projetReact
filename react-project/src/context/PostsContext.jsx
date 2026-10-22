import { createContext, useContext, useEffect, useState } from 'react'

const PostsContext = createContext(null)

export function PostsProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('sofeed-favorites')

      if (!saved) {
        return []
      }

      const parsed = JSON.parse(saved)

      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [minLikes, setMinLikes] = useState('all')
  const [page, setPage] = useState(1)

  function updateSearch(value) {
    setSearch(value)
    setPage(1)
  }

  function updateSelectedTag(value) {
    setSelectedTag(value)
    setPage(1)
  }

  function updateMinLikes(value) {
    setMinLikes(value)
    setPage(1)
  }

  function toggleFavorite(post) {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some(
        (favorite) => favorite.id === post.id
      )

      if (exists) {
        return currentFavorites.filter(
          (favorite) => favorite.id !== post.id
        )
      }

      return [...currentFavorites, post]
    })
  }

  useEffect(() => {
    try {
      localStorage.setItem(
        'sofeed-favorites',
        JSON.stringify(favorites)
      )
    } catch (error) {
      console.error('Erreur de sauvegarde des favoris', error)
    }
  }, [favorites])

  return (
    <PostsContext.Provider value={{favorites, toggleFavorite, search,
    updateSearch, selectedTag, updateSelectedTag, minLikes, updateMinLikes, page, setPage,}}>
      {children}
    </PostsContext.Provider>
  )
}

export function usePostsContext() {
  const context = useContext(PostsContext)

  if (context === null) {
    throw new Error(
      'usePostsContext doit être utilisé dans PostsProvider'
    )
  }

  return context
}