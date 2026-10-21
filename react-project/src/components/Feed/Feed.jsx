import Posts from "../Posts/Posts.jsx"

const posts = [
    {
    "id": 1,
    "title": "His mother had always taught him",
    "body": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
    "tags": [
        "history",
        "american",
        "crime"
    ],
    "reactions": {
        "likes": 192,
        "dislikes": 25
    },
    "views": 305,
    "userId": 121
    },
    {
    "id":21,
    "title": "jdhvpjhefvj",
    "body": "keajfvihebvihbei",
    "tags": [
        "history",
        "american",
        "crime"
    ],
    "reactions": {
        "likes": 192,
        "dislikes": 25
    },
    "views": 305,
    "userId": 122
    }
]

export default function Feed() {

  return (
    <main>
        <section>
          {posts.map((post) => (
            <article key={post.id}>
                <Posts post={post} />
            </article>
          ))}
        </section>
    </main>
  )
}
