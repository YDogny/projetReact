const API_URL = new URL(import.meta.env.VITE_API_URL)
const API_IMAGE_URL = new URL(import.meta.env.VITE_API_IMG)

function getApiUrl(path = '') {
  return `${API_URL.href.replace(/\/$/, '')}${path}`
}

export function getUserImageUrl(userId) {
  return `${API_IMAGE_URL.href.replace(/\/$/, '')}${userId}`
}

async function readJsonResponse(response, errorMessage) {
  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return response.json()
}

export async function fetchPosts() {
const response = await fetch(getApiUrl('?limit=0'))
const data = await readJsonResponse(response, 'Erreur lors de la récupération des posts')

  return data.posts ?? []
}

export async function fetchPostById(id) {
  const response = await fetch(getApiUrl(`/${id}`))

  return readJsonResponse(response, 'Erreur lors de la récupération du post')
}

export async function createPost({ title, body, tags }) {
  const response = await fetch(getApiUrl('/add'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      body,
      tags,
      userId: 1,
    }),
  })

  return readJsonResponse(response, 'Erreur lors de la création de la publication')
}
