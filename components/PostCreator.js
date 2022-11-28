/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from './PostCreator.module.css';
import ReactTimeAgo from 'react-time-ago'

const PostCreator = ({
  avatar, 
  id,
  name, 
  shortBio, 
  postCount,
  postCreatedAt,
  postNumber,
  postId,
}) => {
  const createdAtDate = new Date(postCreatedAt).toLocaleString()
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
        <div className={styles.nameInfo}>
          <Link href={`/users/${id}`} className={styles.name}>{name}</Link>
          <span className={styles.shortBio}>
            {shortBio}
            &nbsp;&middot;&nbsp;
            {postCount} posts
          </span>
        </div>
        <div className={styles.createdDate}>
          <a href={`#post-${postId}`}>#{postNumber}</a>
          &nbsp;&middot;&nbsp;
          <ReactTimeAgo date={createdAtDate} />
        </div>
      </div>
    </div>
  )
}

export default PostCreator