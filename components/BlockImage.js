/* eslint-disable @next/next/no-img-element */
import styles from './BlockImage.module.css';

export const BlockImage = ({ src }) => {

  return (
    <img
      src={src}
      alt=""
      className={styles.image}
    />
  )
}