import escape from 'escape-html'

export const BlockLink = ({ url, content }) => {
  return (
    <a href={escape(url)}>{content}</a>
  )
}