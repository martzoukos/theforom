import styles from './BlockBulletedlist.module.css';

export const BlockBulletedlist = ({ content }) => {
  return (
    <ul className={styles.ul}>
      {content.map((li, i) => {
        return <li key={i} className={styles.li}>{li}</li>
      })}
    </ul>
  )
}