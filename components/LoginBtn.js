import { useSession, signIn, signOut } from "next-auth/react"

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
          <button onClick={() => signOut()}>log out</button>
        )
      </div>
    )
  }
  return (
    <button onClick={() => signIn()}>Sign in</button>
  )
}