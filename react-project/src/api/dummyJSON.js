const API_URL = new URL(import.meta.env.VITE_API_URL);

export async function readPosts() {

    const response = await fetch(API_URL);


    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des posts');
    }
    const data = await response.json();
    return data;
}

// Envoie une publication à DummyJSON avec une liste de tags.
export async function addPosts(theTitle, theBody, theTags) {
    const response = await fetch(`${API_URL.href.replace(/\/$/, '')}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: theTitle,
            body: theBody,
            tags: theTags,
            userId: 1,
        }),
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la création de la publication');
    }

    return response.json();
}