import styles from './BlockParagraph.module.css';

export const BlockParagraph = ({ content }) => {

  return (
    <p className={styles.paragraph}>{content}</p>
  )
}