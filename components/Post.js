import Link from "next/link"
import ReactTimeAgo from "react-time-ago"
import documentToContentBlocks from "../lib/documentToContentBlocks"
import Avatar from "./Avatar"
import styles from './Post.module.css'

const Post = ({content}) => {
  const user = content.User
  const createdAtDate = new Date(content.createdAt).toLocaleString()
  return (
    <div className={styles.post}>  
      <Avatar
        src={user.image}
        alt={user.handle}
        width='30'  
        height='30'  
      />
      <div className={styles.content}>
        <div className={styles.createdBy}>
          <Link href={`/users/${user.handle}`}>{user.handle}</Link> 
          <ReactTimeAgo date={createdAtDate} />
        </div>
        <div className={styles.bubble}>
          <div className={`
            ${styles.typographyContainer}
            typography
          `}>
            {documentToContentBlocks(content.content, content.uploadedMedia) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post