import styles from './Button.module.css'

export default function Button( props ) {
  const { href } = props
  if (href) {
    return(
      <a href className={styles.button} {...props}>
        {props.children}
      </a>
    )
  } else {
    return(
      <button className={styles.button} {...props}>
        {props.children}
      </button>
    )
  }
}