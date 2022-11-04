import styles from './ImageBlock.module.css';

export const ImageBlock = ({ src }) => {

  return (
    <img
      src={src}
      alt=""
      className={styles.image}
    />
  )
}