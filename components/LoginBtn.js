import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import Avatar from "./Avatar"
import styles from './LoginBtn.module.css'

export default function LogInBtn() {
  const { data: session } = useSession()
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
          <button onClick={() => signOut()}>Log out</button>
        )
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}