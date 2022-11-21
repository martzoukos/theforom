import documentToPlainText from "../lib/documentToPlainText"
import styles from './UserPosts.module.css'
import Link from "next/link";

export const UserPosts = ({ posts }) => {
  return (
    <section className={styles.container}>
      <h2>Posts: </h2>
      <ul>
        {posts.map((post, i) => {
          const text = documentToPlainText(post.content).trim()
          const createdAtDate = new Date(post.createdAt).toLocaleString()
          return (
            <li key={i}>
              <div className={styles.content}>
                {text.split(' ').slice(0, 100).join(' ')}
              </div>
              <div className={styles.date}>
                Posted at: 
                {createdAtDate}
              </div>
              <Link 
                href={`/threads/${post.Thread.id}#post-${post.id}`}
                className={styles.thread}
              >
                {post.Thread.subject}
              </Link>
            </li>
          )}
        )}
      </ul>
    </section>
  )
}