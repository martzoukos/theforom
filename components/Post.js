import documentToContentBlocks from "../lib/documentToContentBlocks"
import PostCreator from './PostCreator'
import Container from './Container'
import styles from './Post.module.css'

const Post = ({content, showCreatedBy, postNumber}) => {
  const user = content.User
  return (
    <Container>
      <div className={`
        ${styles.post}
        ${showCreatedBy && styles.bordered}
      `}>
        {showCreatedBy &&
          <PostCreator 
            avatar={user.image}
            id={user.id}
            name={user.name}
            shortBio={user.shortBio}
            postCount={user._count.posts}
            postCreatedAt={content.createdAt}
            postNumber={postNumber}
          />
        }
        <Container isNarrow={true}>
          <div className={`
            ${styles.typographyContainer}
            typography
          `}>
            {documentToContentBlocks(content.content, content.uploadedMedia) }
          </div>
        </Container>
      </div>
    </Container>
  )
}

export default Post