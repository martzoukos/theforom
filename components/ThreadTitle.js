import Container from './Container';
import styles from './ThreadTitle.module.css';
import ReactTimeAgo from 'react-time-ago'

const ThreadTitle = ({title, date}) => {
  const createdAtDate = new Date(date).toLocaleString()
  return (
    <Container>
      <div className={styles.threadTitle}>
        <h1 className={`
          ${styles.title}
          as-h2
        `}>
          {title}
        </h1>
        <ReactTimeAgo 
          date={createdAtDate}
          className={styles.createdDate} 
        />
      </div>
    </Container>
  )
}

export default ThreadTitle