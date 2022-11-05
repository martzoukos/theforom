import styles from './BlockLink.module.css';
import escape from 'escape-html'

export const BlockLink = ({ url, content }) => {
  return (
    <a className={styles.link} href={escape(url)}>{content}</a>
  )
}