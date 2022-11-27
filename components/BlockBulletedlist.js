export const BlockBulletedlist = ({ content }) => {
  return (
    <ul>
      {content.map((li, i) => {
        return <li key={i}>{li}</li>
      })}
    </ul>
  )
}