import Link from "next/link"
import Avatar from "./Avatar"
import { useRouter } from "next/router"
import styles from './ThreadsTableRow.module.css'

export default function ThreadsTableRow({ thread }) {
  const router = useRouter()
  const threadURL = `/threads/${thread.id}`
  return(
    <tr 
      className={styles.row}
      onClick={() => {
        router.push(threadURL)
      }}
    >
      <td>
        <div className={styles.topic}>
          <Avatar alt={thread.User.name} src={thread.User.image} />
          <div>
            <Link href={threadURL}>
              {thread.subject}
            </Link>
            <div>
              {thread.User.name}
              {new Date(thread.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </td>
      <td className={styles.categories}>
        #animals
        <br/>
        #questions
        <br/>
        #general
      </td>
      <td className={styles.replies}>
        {thread._count.posts}
        <br/>
        Replies
      </td>
      <td className={styles.latestActivity}>
        <Avatar alt={thread.User.name} src={thread.User.image} />
        <Avatar alt={thread.User.name} src={thread.User.image} />
        <br/>
        {new Date(thread.createdAt).toLocaleString()}
      </td>
    </tr>
  )
}