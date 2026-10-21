export default function Posts({ post }) {
  return (
    <article>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        {/* Affiche les tags du post sous forme de hashtags */}
        {post.tags.map((tag, i) => (
            <span key={i}>#{tag}</span>
        ))}

        {/* Affiche chaque réaction (likes, dislikes, etc.) avec sa valeur */}
        {Object.entries(post.reactions).map(([key, value]) => (
            <span key={key}>{key}: {value}</span>
        ))}   
        <span>Vue: {post.views}</span>
    </article>
  )
}