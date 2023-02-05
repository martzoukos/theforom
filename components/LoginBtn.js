import Link from "next/link"
import Avatar from "./Avatar"
import styles from './LoginBtn.module.css'

export default function LogInBtn() {
  const session = null //replace with clerk
  const possibleFirstName = session?.user?.name?.split(' ')[0]
  if (session) {
    return (
      <div className={styles.container}>
        {possibleFirstName &&
          <span className={styles.welcomeBack}>Welcome back <b>{possibleFirstName}</b></span>
        }
        <div className={styles.avatar}>
          <Avatar 
            src={session?.user?.image}
            alt={session?.user?.name}
            width={24}
            height={24}
          />
        </div>
        (
          <Link href='/settings'>Settings</Link>
          &nbsp;&middot;&nbsp;
          <button>Log out</button>
        )
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <button>Sign in</button>
    </div>
  )
}