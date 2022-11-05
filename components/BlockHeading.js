import styles from './BlockHeading.module.css';

export const BlockHeading = ({ content, type }) => {
  
  switch (type) {
    case 'heading-one':
      return <h1 className={styles.h1}>{ content }</h1>
    case 'heading-two':
      return <h2 className={styles.h2}>{ content }</h2>
    case 'heading-three':
      return <h3 className={styles.h3}>{ content }</h3>
    case 'heading-four':
      return <h4 className={styles.h4}>{ content }</h4>
    case 'heading-five':
      return <h5 className={styles.h5}>{ content }</h5>
    case 'heading-six':
      return <h6 className={styles.h6}>{ content }</h6>
  }
}