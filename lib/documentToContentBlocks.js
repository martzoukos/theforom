import { Text } from 'slate';
import { BlockImage } from '../components/BlockImage';
import { BlockParagraph } from '../components/BlockParagraph';
import { BlockQuote } from '../components/BlockQuote';
import { BlockNumberedlist } from '../components/BlockNumberedlist';
import { BlockBulletedlist } from '../components/BlockBulletedlist';
import { BlockHeading } from '../components/BlockHeading';
import { BlockLink } from '../components/BlockLink';
import { BlockVideo } from '../components/BlockVideo';
import { BLOCK, INLINE } from '../components/Slate/constants'

export default function documentToContentBlocks(nodes, uploadedMedia) {
  return nodes.map(n => serialize(n, uploadedMedia))
}

const serialize = (node, uploadedMedia) => {
  if (Text.isText(node)) {
    let string = node.text
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
    case BLOCK.H1:
    case BLOCK.H2:
    case BLOCK.H3:
    case BLOCK.H4:
    case BLOCK.H5:
    case BLOCK.H6:
      return <BlockHeading content={children} type={node.type} />
    case BLOCK.oL:
      return <BlockNumberedlist content={children} />
    case BLOCK.UL:
      return <BlockBulletedlist content={children} />
    case BLOCK.BLOCKQUOTE:
      return <BlockQuote content={children} />
    case BLOCK.PARAGRAPH:
      return <BlockParagraph content={children} />
    case INLINE.LINK:
      return <BlockLink url={node.url} content={children} />
    case BLOCK.IMG:
      return <BlockImage src={node.url} />
    case BLOCK.UPLOADEDIMG:
      const imageUrl = uploadedMedia[node.id].url
      return <BlockImage src={imageUrl} />
    case BLOCK.VIDEO:  
      return <BlockVideo url={node.url} />
    default:
      return children
  }
}
