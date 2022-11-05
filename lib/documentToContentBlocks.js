import escape from 'escape-html'
import { Text } from 'slate';
import { BlockImage } from '../components/BlockImage';
import { BlockParagraph } from '../components/BlockParagraph';
import { BlockQuote } from '../components/BlockQuote';
import { BlockNumberedlist } from '../components/BlockNumberedlist';
import { BlockBulletedlist } from '../components/BlockBulletedlist';
import { BlockHeading } from '../components/BlockHeading';
import { BlockLink } from '../components/BlockLink';
import { BlockVideo } from '../components/BlockVideo';

export default function documentToContentBlocks(nodes) {
  return nodes.map(n => serialize(n))
}

const serialize = node => {
  if (Text.isText(node)) {
    let string = escape(node.text)
    if (node.bold) {
      string = <strong>{string}</strong>
    }
    if (node.italic) {
      string = <em>{string}</em>
    }
    if (node.underline) {
      string = <u>{string}</u>
    }
    if (node.strikethrough) {
      string = <s>{string}</s>
    }
    return string
  }

  const children = node.children.map(n => serialize(n))

  switch (node.type) {
    case 'heading-one':
    case 'heading-two':
    case 'heading-three':
    case 'heading-four':
    case 'heading-five':
    case 'heading-six':
      return <BlockHeading content={children} type={node.type} />
    case 'numbered-list':
      return <BlockNumberedlist content={children} />
    case 'bulleted-list':
      return <BlockBulletedlist content={children} />
    case 'block-quote':
      return <BlockQuote content={children} />
    case 'paragraph':
      return <BlockParagraph content={children} />
    case 'link':
      return <BlockLink url={node.url} content={children} />
    case 'image':
      return <BlockImage src={node.url} />
    case 'video':  
      return <BlockVideo url={node.url} />
    default:
      return children
  }
}