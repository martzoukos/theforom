import {  
  Editor,
  Transforms,
  Element as SlateElement 
} from 'slate';
import { useSlate } from "slate-react"
import Sticky from "react-sticky-el"
import Button from '../Button';
import { 
  Bold, 
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Quote,
  List,
  ListOrdered,
} from "lucide-react"
import { AddLinkButton, RemoveLinkButton, addLink } from './links'
import { InsertImageButton } from './images'
import { InsertVideoButton } from './videos'
import styles from './SlateEditor.module.css'
import { BLOCK, INLINE, LIST_TYPES } from './constants';

export const SlateToolbar =() => {
  return (
    <Sticky className={styles.toolbar}>
      <div className={styles.toolbar}>
        <ButtonGroup variant='outlined' className={styles.buttonGroup}>
          <ToolbarButton format={INLINE.BOLD} type='mark'>
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton format={INLINE.ITALIC} type='mark'>
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton format={INLINE.UNDERLINE} type='mark'>
            <Underline size={18} />
          </ToolbarButton>
          <ToolbarButton format={INLINE.STRIKETHROUGH} type='mark'>
            <Strikethrough size={18} />
          </ToolbarButton>
        </ButtonGroup>
        <ButtonGroup variant='outlined' className={styles.buttonGroup}>
          <ToolbarButton format={INLINE.H1} type='block'>
            <Heading1 size={18} />
          </ToolbarButton>
          <ToolbarButton format={INLINE.H2} type='block'>
            <Heading2 size={18} />
          </ToolbarButton>
          <ToolbarButton format={INLINE.H3} type='block'>
            <Heading3 size={18} />
          </ToolbarButton>
          <ToolbarButton format={INLINE.H4} type='block'>
            <Heading4 size={18} />
          </ToolbarButton>
          <ToolbarButton format={INLINE.H5} type='block'>
            <Heading5 size={18} />
          </ToolbarButton>
          <ToolbarButton format={INLINE.H6} type='block'>
            <Heading6 size={18} />
          </ToolbarButton>
        </ButtonGroup>
        <ButtonGroup variant='outlined' className={styles.buttonGroup}>
          <ToolbarButton format={BLOCK.BLOCKQUOTE} type='block'>
            <Quote size={18} />
          </ToolbarButton>
          <ToolbarButton format={BLOCK.UL} type='block'>
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton format={BLOCK.OL} type='block'>
            <ListOrdered size={18} />
          </ToolbarButton>
        </ButtonGroup>
        <ButtonGroup variant='outlined' className={styles.buttonGroup}>
          <AddLinkButton />
          <RemoveLinkButton />
        </ButtonGroup>
        <ButtonGroup variant='outlined' className={styles.buttonGroup}>
          <InsertImageButton />
          <InsertVideoButton />
        </ButtonGroup>
      </div>
    </Sticky>
  )
}

const ToolbarButton = ({ format, type = 'mark', children }) => {
  const editor = useSlate()
  const isActive = type === 'mark' ? isMarkActive(editor, format) : isBlockActive(editor, format)
  return (
    <Button
      type="button"
      variant={isActive ? 'contained' : 'outlined'}
      size='small'
      active={isActive.toString()}
      onMouseDown={event => {
        event.preventDefault()
        if (type==='mark') {
          toggleMark(editor, format)
        }else if (type==='block') {
          toggleBlock(editor, format)
        }
      }}
    >
      {children}
    </Button>
  )
}



/////////////
// MARKS
/////////////
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

/////////////
// BLOCKS
/////////////
const isBlockActive = (editor, format) => {
  const { selection } = editor
  if (!selection) return false
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => 
        !Editor.isEditor(n) && 
        SlateElement.isElement(n) && 
        n['type'] === format
    })
  )
  return !!match
}

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor,format)
  const isList = LIST_TYPES.includes(format)

  // This removes list and list-item formatting before applying other styles
  // If we don't unwrap, the new format will sit under a ul or ol element
  Transforms.unwrapNodes(editor, {
    match: n => {
      return (
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type)
      )
    },
    split: true,
  })

  let newProperties = {
    type: isActive ? BLOCK.PARAGRAPH : isList ? BLOCK.LI : format,
  }

  if (format === INLINE.LINK) {
    addLink(editor)
  } else {
    Transforms.setNodes(editor, newProperties)
  }

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}