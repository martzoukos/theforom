/* eslint-disable @next/next/no-img-element */
import styles from './ThreadCreator.module.css';
import Link from 'next/link';
import Container from './Container'
import Avatar from './Avatar';

const ThreadCreator = ({
  avatar, 
  handle, 
  name, 
  shortBio, 
  postCount
}) => {
  return (
    <Container>
      <div className={styles.threadCreator}>
        <Link href={`/users/${handle}`}>
          <Avatar 
            src={avatar}
            alt={name} 
          />
        </Link>
        <div className={styles.name} title={name}>{handle}</div>
        <div className={styles.shortBio}>
          {shortBio &&
          <span>&nbsp;&middot;&nbsp;{shortBio}</span>}
          {postCount} posts
        </div>
      </div>
    </Container>
  )
}

export default ThreadCreator