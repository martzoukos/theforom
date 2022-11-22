import Avatar from "./Avatar"

export default function ThreadsTable({ threads }) {
  return(
    <table>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Categories</th>
          <th>Replies</th>
          <th>Latest</th>
        </tr>
      </thead>
      <tbody>
        {threads.map((thread, i) => (
          <tr key={i}>
            <td>
              <Avatar alt={thread.User.name} src={thread.User.image} />
              {thread.subject}
              {thread.User.name}
              {new Date(thread.createdAt).toLocaleString()}
            </td>
            <td>
              #animals
              <br/>
              #questions
              <br/>
              #general
            </td>
            <td>
              {thread._count.posts}
              <br/>
              Replies
            </td>
            <td>
              <Avatar alt={thread.User.name} src={thread.User.image} />
              <Avatar alt={thread.User.name} src={thread.User.image} />
              <br/>
              {new Date(thread.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}