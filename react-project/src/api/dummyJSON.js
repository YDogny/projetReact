const API_URL = new URL(import.meta.env.VITE_API_URL);

export async function readPosts() {

    const response = await fetch(API_URL);


    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des posts');
    }
    const data = await response.json();
    return data;
}