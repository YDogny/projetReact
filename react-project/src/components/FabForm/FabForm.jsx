import { useState } from "react";
import styles from "./FabForm.module.css";

export default function FabForm({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !body.trim()) {
      setError("Le titre et le contenu sont obligatoires.");
      return;
    }

    const postTags = [...new Set(tags.split(",").map((tag) => tag.trim()).filter(Boolean))];

    setLoading(true);
    try {
      await onPostCreated({
        title: title.trim(),
        body: body.trim(),
        tags: postTags,
      });
      setTitle("");
      setBody("");
      setTags("");
      setSuccess("La publication a été ajoutée au fil.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la création.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.section}>
      <section className={styles.form} aria-labelledby="contact-title">
        <h2 className={styles.title} id="contact-title">Créer une publication</h2>
        <form className={styles.fields} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="post-title">Titre</label>
          <input
            className={styles.input}
            id="post-title"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label className={styles.label} htmlFor="post-body">Contenu</label>
          <textarea
            className={styles.input}
            id="post-body"
            placeholder="Entrez le contenu de votre publication"
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <label className={styles.label} htmlFor="post-tags">Tags</label>
          <input
            className={styles.input}
            id="post-tags"
            placeholder="react, javascript, web"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            aria-describedby="post-tags-help"
          />
          <small id="post-tags-help">Sépare les tags par des virgules.</small>
          {error && <p className={styles.error} role="alert">{error}</p>}
          {success && <p className={styles.success} role="status">{success}</p>}
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Publication en cours…" : "Publier"}
          </button>
        </form>
      </section>
    </div>
  );
}