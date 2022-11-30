import Link from "next/link"
import documentToPlainText from "../lib/documentToPlainText"
import styles from './UserPost.module.css'
import ReactTimeAgo from "react-time-ago"
import Container from "./Container"

export default function UserPost({ post }) {
  const text = documentToPlainText(post.content)
  const trimmedText = text? text.trim().split(' ').slice(0, 100).join(' ') + '…' : '…'
  return(
    <div className={styles.post}>
      <div className={styles.header}>
        <div>
          Reply in: &nbsp;
          <Link href={`/threads/${post.Thread.id}#post-${post.id}`}>{post.Thread.subject}</Link>
        </div>
        <div>
          <ReactTimeAgo date={post.createdAt} />
        </div>
      </div>
      <Container isNarrow={true}>
        <div className={`
          typography
          ${styles.content}
        `}>
          {trimmedText}
        </div>
      </Container>
    </div>
  )
}