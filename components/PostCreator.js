/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from './PostCreator.module.css';

const PostCreator = ({
  avatar, 
  id,
  name, 
  shortBio, 
  postCount,
  postCreatedAt,
}) => {
  const createdAtDate = new Date(postCreatedAt).toLocaleString()
  console.log(id)
  return (
    <div className={styles.postCreator}>
      <Link href={`/users/${id}`} className={styles.avatar}>
        <img 
          className={styles.avatarImage}
          src={avatar}
          alt={`Profile picture of ${name}`}
        />
      </Link>
      <div className={styles.metaContent}>
        <div>
          <span className={styles.name}>{name}</span>
          &nbsp;&middot;&nbsp;
          <span className={styles.shortBio}>
            {shortBio}
            &nbsp;&middot;&nbsp;
            {postCount} posts
          </span>
        </div>
        <time className={styles.createdDate}>Posted at: {createdAtDate}</time>
      </div>
    </div>
  )
}

export default PostCreator