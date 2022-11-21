import { useSession, signIn, signOut } from "next-auth/react"
import Button from "./Button"

export default function LogInBtn() {
  const { data: session } = useSession()
  const possibleFirstName = session?.user?.name?.split(' ')[0]
  if (session) {
    return (
      <div>
        {possibleFirstName &&
          <span>welcome back <b>{possibleFirstName}</b></span>
        }
        (
          <Button onClick={() => signOut()}>log out</Button>
        )
      </div>
    )
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}