import styles from './PostSkeleton.module.css'

export default function PostSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <article className={styles.post} key={index} aria-hidden="true">
          <div className={styles.header}>
            <span className={styles.avatar} />
            <span className={styles.author} />
          </div>
          <div className={styles.content}>
            <span className={styles.title} />
            <span className={styles.line} />
            <span className={`${styles.line} ${styles.shortLine}`} />
          </div>
          <div className={styles.footer} />
        </article>
      ))}
    </>
  )
}
