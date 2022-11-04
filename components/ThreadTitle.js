import styles from './ThreadTitle.module.css';

const ThreadTitle = ({title, date}) => {
  const createdAtDate = new Date(date).toLocaleString()
  return (
    <div className={styles.threadTitle}>
      <h1 className={styles.title}>{title}</h1>
      <time style={{ 
        backgroundColor: '#EFEFEF',
        display: 'block',
        fontSize: '0.7em',
        padding: '1em'
      }}>
        Created at: {createdAtDate}
      </time>
    </div>
  )
}

export default ThreadTitle