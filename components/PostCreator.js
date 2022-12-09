/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from './PostCreator.module.css';
import ReactTimeAgo from 'react-time-ago'
import Avatar from './Avatar';

const PostCreator = ({
  avatar, 
  handle,
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
      <Link href={`/users/${handle}`} className={styles.avatar}>
        <Avatar src={avatar} alt={name} />
      </Link>
      <div className={styles.metaContent}>
        <div className={styles.nameInfo}>
          <Link href={`/users/${handle}`} className={styles.name} title={name}>{handle}</Link>
          <span className={styles.shortBio}>
            {shortBio &&
            <span>&nbsp;&middot;&nbsp;{shortBio}</span>
            }
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