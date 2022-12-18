import Link from "next/link"
import ReactTimeAgo from "react-time-ago"
import documentToContentBlocks from "../lib/documentToContentBlocks"
import Avatar from "./Avatar"
import styles from './MainPost.module.css'

const MainPost = ({threadTitle, content}) => {
  const user = content.User
  const createdAtDate = new Date(content.createdAt).toLocaleString()
  return (
    <div className={styles.bubble}>
      <h1 className={styles.threadTitle}>{threadTitle}</h1>
      <div className={styles.createdBy}>
        <Avatar 
          src={user.image} 
          alt={user.handle} 
          className={styles.avatar} 
          width='27'  
          height='27'  
        />
        <span className={styles.name}>
          by <Link href={`/users/${user.handle}`}>{user.handle}</Link>
        </span> 
      </div>
      <div className={`
        ${styles.typographyContainer}
        typography
      `}>
        {documentToContentBlocks(content.content, content.uploadedMedia) }
      </div>
      <ReactTimeAgo date={createdAtDate} className={styles.createdAt} />
    </div>
  )
}

export default MainPost