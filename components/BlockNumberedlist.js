import styles from './BlockNumberedlist.module.css';

export const BlockNumberedlist = ({ content }) => {
  return (
    <ol className={styles.ol}>
      {content.map((li, i) => {
        return <li key={i} className={styles.li}>{li}</li>
      })}
    </ol>
  )
}