import { Text } from 'slate';
import { BlockImage } from '../components/BlockImage';
import { BlockParagraph } from '../components/BlockParagraph';
import { BlockQuote } from '../components/BlockQuote';
import { BlockNumberedlist } from '../components/BlockNumberedlist';
import { BlockBulletedlist } from '../components/BlockBulletedlist';
import { BlockHeading } from '../components/BlockHeading';
import { BlockLink } from '../components/BlockLink';
import { BlockVideo } from '../components/BlockVideo';
import { BlockSocial } from '../components/BlockSocial';
import { BLOCK, INLINE } from '../components/Slate/constants'
import { CodeBlock } from '../components/CodeBlock';

export default function documentToContentBlocks(nodes, uploadedMedia) {
  if (nodes === '') { return }
  return nodes.map(n => serialize(n, uploadedMedia))
}

const serialize = (node, uploadedMedia) => {
  if (Text.isText(node)) {
    let string = renderLineBreak(node.text)
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
    if (node.code) {
      string = <code>{string}</code>
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
    case BLOCK.OL:
      return <BlockNumberedlist content={children} />
    case BLOCK.UL:
      return <BlockBulletedlist content={children} />
    case BLOCK.BLOCKQUOTE:
      return <BlockQuote content={children} />
    case BLOCK.CODEBLOCK:
      return <CodeBlock content={children} />
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
    case BLOCK.SOCIAL:  
      return <BlockSocial url={node.url} provider={node.provider} />
    default:
      return children
  }
}

const renderLineBreak = string => {
  if (string?.includes('\n')) {
    return string.split('\n').map((s,i) => {
      return i === 0 ? <>{s}<br/></> : <>{s}</>
    })
  } else {
    return string
  }
}