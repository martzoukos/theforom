/* eslint-disable @next/next/no-img-element */
import styles from './ThreadCreator.module.css';
import Link from 'next/link';
import Container from './Container'

const ThreadCreator = ({
  avatar, 
  id, 
  name, 
  shortBio, 
  postCount
}) => {
  return (
    <Container>
      <div className={styles.threadCreator}>
        <Link href={`/users/${id}`}>
          <img 
            className={styles.avatar}
            src={avatar}
            alt={`Profile picture of ${name}`}
          />
        </Link>
        <div className={styles.name}>{name}</div>
        <div className={styles.shortBio}>
          {shortBio}
          &nbsp;&middot;&nbsp;
          {postCount} posts
        </div>
      </div>
    </Container>
  )
}

export default ThreadCreator