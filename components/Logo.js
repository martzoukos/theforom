import Link from 'next/link';
import Styles from './Logo.module.css';

export default function Logo() {
  return (
    <Link href="/">
      <span className={Styles.red} />
      <span className={Styles.green} />
      <span className={Styles.blue} />
    </Link>
  )
}