import styles from './ThreadTitle.module.css';

const ThreadTitle = ({title, date}) => {
  const createdAtDate = new Date(date).toLocaleString()
  return (
    <div className={styles.threadTitle}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.createdDate}>
        Created at: <time>{createdAtDate}</time>
      </div>
    </div>
  )
}

export default ThreadTitle