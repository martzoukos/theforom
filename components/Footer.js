import Logo from "./Logo"
import Link from "next/link"
import { UIModeSwitcher } from "./UIModeSwitcher"
import styles from './Footer.module.css'
import Container from "./Container"

export default function Footer() {
  return(
    <footer className={styles.footer}>
      <Container>
        <div className={styles.flexContainer}>
          <div className={styles.leftColumn}>
            <div>
              <div className={styles.logo}>
                <Logo />
              </div>
              <span className={styles.madeIn}>
                Made in wonderfull Athens, Greece
              </span>
            </div>
            <div className={styles.copyright}>
              Copyright © {new Date().getFullYear()} The Forom. All rights reserved.
            </div>
          </div>
          <div className={styles.rightColumn}>
            <Link className={styles.footerLink} href='/terms-of-service'>Terms of Service</Link>
            <Link className={styles.footerLink} href='/privacy-policy'>Privacy Policy</Link>
            <UIModeSwitcher />
          </div>
        </div>
      </Container>
    </footer>
  )
}