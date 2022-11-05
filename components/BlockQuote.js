import styles from './BlockQuote.module.css';

export const BlockQuote = ({ content }) => {

  return (
    <blockquote className={styles.blockquote}>{content}</blockquote>
  )
}