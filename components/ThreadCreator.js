/* eslint-disable @next/next/no-img-element */
import styles from './ThreadCreator.module.css';

const ThreadCreator = ({avatar, name, shortBio, postCount}) => {
  return (
    <div className={styles.threadCreator}>
      <img 
        className={styles.avatar}
        src={avatar}
        alt={`Profile picture of ${name}`}
      />
      <div className={styles.name}>{name}</div>
      <div className={styles.shortBio}>
        {shortBio}
        &nbsp;&middot;&nbsp;
        {postCount} posts
      </div>
    </div>
  )
}

export default ThreadCreator