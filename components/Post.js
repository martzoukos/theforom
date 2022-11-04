import documentToHtmlString from "../lib/documentToHtmlString"

const Post = ({content, showCreatedBy}) => {
  const createdAtDate = new Date(content.createdAt)
  return (
    <div style={{ marginBottom: '2em' }}>
      <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(content.content) }} />
      {showCreatedBy &&
        <>
          <time style={{ 
            backgroundColor: '#EFEFEF',
            display: 'block',
            fontSize: '0.7em',
            padding: '1em'
          }}>
            Created at: {createdAtDate.toLocaleString()}
          </time>
          by &nbsp;
          {content.User.email}
        </>
      }
    </div>
  )
}

export default Post