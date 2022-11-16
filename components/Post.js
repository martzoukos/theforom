import styles from './Post.module.css'
import documentToContentBlocks from "../lib/documentToContentBlocks"
import PostCreator from './PostCreator'

const Post = ({content, showCreatedBy, withBackground}) => {
  const user = content.User
  return (
    <div className={`
        ${styles.post}
        ${withBackground && styles.withBackground}
      `}>
      {showCreatedBy &&
        <PostCreator 
          avatar={user.image}
          id={user.id}
          name={user.name}
          shortBio={user.shortBio}
          postCount={user._count.posts}
          postCreatedAt={content.createdAt}
        />
      }
      <div>{documentToContentBlocks(content.content, content.uploadedMedia) }</div>
    </div>
  )
}

export default Post