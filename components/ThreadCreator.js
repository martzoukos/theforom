/* eslint-disable @next/next/no-img-element */
import styles from './ThreadCreator.module.css';
import Link from 'next/link';
import Container from './Container'
import Avatar from './Avatar';

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
          <Avatar 
            src={avatar}
            alt={name} 
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