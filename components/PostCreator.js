/* eslint-disable @next/next/no-img-element */
import styles from './PostCreator.module.css';

const PostCreator = ({
  avatar, 
  name, 
  shortBio, 
  postCount,
  postCreatedAt,
}) => {
  const createdAtDate = new Date(postCreatedAt).toLocaleString()
  return (
    <div className={styles.postCreator}>
      <img 
        className={styles.avatar}
        src={avatar}
        alt={`Profile picture of ${name}`}
      />
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