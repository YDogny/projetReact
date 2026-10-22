import { getUserImageUrl } from '../../api/postsApi.js'

export function normalizePost(post) {
  const userId = post.userId ?? 0

  return {
    id: post.id,
    img: getUserImageUrl(userId),
    title: post.title ?? 'Titre inconnu',
    body: post.body ?? 'Contenu inconnu',
    tags: post.tags ?? [],
    reactions: post.reactions ?? { likes: 0, dislikes: 0 },
    views: post.views ?? 0,
    userId,
  }
}
