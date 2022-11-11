import {  
  Editor,
  Transforms,
  Element as SlateElement 
} from 'slate';
import { useSlate } from "slate-react"
import Sticky from "react-sticky-el"
import { Button, ButtonGroup } from "@mui/material"
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

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const SlateToolbar =() => {
  return (
    <Sticky className={styles.toolbar}>
      <div className={styles.toolbar}>
        <ButtonGroup variant='outlined' className={styles.buttonGroup}>
          <ToolbarButton format="bold" type='mark'>
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton format="italic" type='mark'>
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton format="underline" type='mark'>
            <Underline size={18} />
          </ToolbarButton>
          <ToolbarButton format="strikethrough" type='mark'>
            <Strikethrough size={18} />
          </ToolbarButton>
        </ButtonGroup>
        <ButtonGroup variant='outlined' className={styles.buttonGroup}>
          <ToolbarButton format="heading-one" type='block'>
            <Heading1 size={18} />
          </ToolbarButton>
          <ToolbarButton format="heading-two" type='block'>
            <Heading2 size={18} />
          </ToolbarButton>
          <ToolbarButton format="heading-three" type='block'>
            <Heading3 size={18} />
          </ToolbarButton>
          <ToolbarButton format="heading-four" type='block'>
            <Heading4 size={18} />
          </ToolbarButton>
          <ToolbarButton format="heading-five" type='block'>
            <Heading5 size={18} />
          </ToolbarButton>
          <ToolbarButton format="heading-six" type='block'>
            <Heading6 size={18} />
          </ToolbarButton>
        </ButtonGroup>
        <ButtonGroup variant='outlined' className={styles.buttonGroup}>
          <ToolbarButton format="block-quote" type='block'>
            <Quote size={18} />
          </ToolbarButton>
          <ToolbarButton format="bulleted-list" type='block'>
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton format="numbered-list" type='block'>
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
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }

  if (format === 'link') {
    addLink(editor)
  } else {
    Transforms.setNodes(editor, newProperties)
  }

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}