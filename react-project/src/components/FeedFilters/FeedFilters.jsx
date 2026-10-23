
import { usePostsContext } from '../../context/PostsContext.jsx'
import styles from '../../pages/Feed/Feed.module.css'

export default function FeedFilters({ availableTags }) {
  const {
    search,
    updateSearch,
    selectedTag,
    updateSelectedTag,
    minLikes,
    updateMinLikes,
  } = usePostsContext()

  return (
    <div className={styles.filters}>
      <label htmlFor="search-posts">
        Rechercher une publication
      </label>

      <input
        id="search-posts"
        type="search"
        placeholder="Rechercher dans les publications"
        value={search}
        onChange={(e) => updateSearch(e.target.value)}
      />

      <label htmlFor="filter-tag">Filtrer par tag</label>

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
  )
}
