export const BlockNumberedlist = ({ content }) => {
  return (
    <ol>
      {content.map((li, i) => {
        return <li key={i}>{li}</li>
      })}
    </ol>
  )
}