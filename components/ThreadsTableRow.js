import Link from "next/link"
import Avatar from "./Avatar"
import { useRouter } from "next/router"
import styles from './ThreadsTableRow.module.css'
import ReactTimeAgo from 'react-time-ago'
import flattenParticipants from "../lib/flattenParticipants"

export default function ThreadsTableRow({ thread }) {
  const router = useRouter()
  const threadURL = `/threads/${thread.id}`
  const participants = flattenParticipants(thread.posts)
  return(
    <tr 
      className={styles.row}
      onClick={() => {
        router.push(threadURL)
      }}
    >
      <td>
        <div className={styles.topic}>
          <div className={styles.avatar}>
            <Avatar 
              alt={thread.User.name} 
              src={thread.User.image}   
            />
          </div>
          <div className={styles.threadInfo}>
            <Link href={threadURL} className={styles.subject}>
              {thread.subject}
            </Link>
            <div className={styles.smallInfo}>
              {thread.User.name}
              <ReactTimeAgo 
                date={thread.createdAt}
                className={styles.createdAt} 
              />
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
        <span className={styles.repliesNumber}>
          {thread._count.posts}
        </span>
        <span className={styles.repliesLabel}>
          Replies
        </span>
      </td>
      <td className={styles.latestActivity}>
        <div className={styles.participants}>
          {participants.map((user, i) => {
            return(
              <Avatar 
                key={i}
                alt={user.name} 
                src={user.image}
                width={25}
                height={25}
              />
            )
          })}
        </div>
        <ReactTimeAgo 
          date={thread.updatedAt}
          className={styles.updatedAt}
        />
      </td>
    </tr>
  )
}