import Link from 'next/link'
import styles from './Button.module.css'

export default function Button( props ) {
  const { href } = props
  if (href) {
    return(
      <Link href className={styles.button} {...props}>
        {props.children}
      </Link>
    )
  } else {
    return(
      <button className={styles.button} {...props}>
        {props.children}
      </button>
    )
  }
}