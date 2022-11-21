import LogInBtn from './LoginBtn';
import Logo from './Logo';
import styles from './HeaderNavigation.module.css'

export default function HeaderNavigation() {
  return(
    <nav className={styles.nav}>
      <Logo />
      <LogInBtn className={styles.login} />
    </nav>
  )
}
