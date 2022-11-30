import Button from "./Button"
import styles from './SignInForm.module.css'

export default function SignInForm({ csrfToken }) {
  return(
    <div>
      <h1 className="as-h2">Sign in</h1>
      <p className={styles.subline}>
        Just add your email and you will receive a magic link to sign in. 🪄
        <br/>
        No need to create and remember passwords.
      </p>
      <form method="post" action="/api/auth/signin/email" className={styles.form}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Your email address
          <input type="email" id="email" name="email" className={styles.input} />
        </label>
        <br/>
        <Button type="submit">Sign in with Email</Button>
      </form>
    </div>
  )
}