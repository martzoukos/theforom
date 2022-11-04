import escape from 'escape-html'
import { Text } from 'slate';
import urlParser from "js-video-url-parser";
import { ImageBlock } from '../components/ImageBlock';

export default function documentToContentBlocks(nodes) {
  return nodes.map(n => serialize(n))
}

const serialize = node => {
  if (Text.isText(node)) {
    let string = escape(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    return string
  }

  const children = node.children.map(n => serialize(n))

  switch (node.type) {
    case 'block-quote':
      return <blockquote><p>{children}</p></blockquote>
    case 'paragraph':
      return <p>{children}</p>
    case 'link':
      return <a href={escape(node.url)}>{children}</a>
    case 'image':
      return <ImageBlock src={node.url} />
    case 'video':  
      const embedYoutubeURL = urlParser.parse(node.url)
      return (
        <iframe 
          style={{
            display: 'block',
            width: '100%',
            height: '20em'
          }}
          src={`https://www.youtube.com/embed/${embedYoutubeURL.id}`}
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen   
        />
      )      
    default:
      return children
  }
}