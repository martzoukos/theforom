import Container from './Container';
import styles from './ThreadTitle.module.css';
import ReactTimeAgo from 'react-time-ago'
import Link from 'next/link';

const ThreadTitle = ({title, date, categories}) => {
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
        <div className={styles.subline}>
          <ReactTimeAgo date={createdAtDate} />
          {categories.length > 0 &&
            <>
              &nbsp;
              in
              &nbsp;
              {categories.map((c, i) => {
                const category = c.Category
                return(
                  <>
                    <Link 
                      href={`/categories/${category.name}`} 
                      key={i}
                    >
                      #{category.name}
                    </Link>
                    {i <= categories.length-2 && <>,&nbsp;</>}
                  </>
                )
              })}
            </>
          }
        </div>
      </div>
    </Container>
  )
}

export default ThreadTitle