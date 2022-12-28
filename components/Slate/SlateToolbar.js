import { useState } from 'react';
import {  
  Editor,
  Transforms,
  Element as SlateElement 
} from 'slate';
import { useSlate } from "slate-react"
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
  Code,
  CurlyBraces,
  Plus,
} from "lucide-react"
import { addLink } from './withInlines'
import styles from './SlateToolbar.module.css'
import { BLOCK, INLINE, LIST_TYPES } from './constants';
import SlateToolbarBlockActions from './SlateToolbarBlockActions';

export const SlateToolbar =({ visible }) => {
  const [blocksPanelOpen, setBlocksPanelOpen] = useState(false)

  return (
    <div className={`
      ${styles.toolbar}
      ${visible && styles.visible}
    `}>
      <div className={styles.topBar}>
        <button
          type='button'
          className={`
            ${styles.button}
            ${blocksPanelOpen && styles.buttonActive}
          `}
          onMouseDown={() => {
            setBlocksPanelOpen(!blocksPanelOpen)
          }} 
        >
          <Plus size={14} />
        </button>
        <div className={styles.shadowContainer}>
          <div className={styles.toggleActions}>
            <div className={styles.scrollableActions}>
              <ToolbarButton format={INLINE.BOLD} type='mark'>
                <Bold size={14} />
              </ToolbarButton>
              <ToolbarButton format={INLINE.ITALIC} type='mark'>
                <Italic size={14} />
              </ToolbarButton>
              <ToolbarButton format={INLINE.UNDERLINE} type='mark'>
                <Underline size={14} />
              </ToolbarButton>
              <ToolbarButton format={INLINE.STRIKETHROUGH} type='mark'>
                <Strikethrough size={14} />
              </ToolbarButton>
              <ToolbarButton format={INLINE.CODE} type='mark'>
                <Code size={14} />
              </ToolbarButton>
              <ToolbarButton format={BLOCK.H1} type='block'>
                <Heading1 size={14} />
              </ToolbarButton>
              <ToolbarButton format={BLOCK.H2} type='block'>
                <Heading2 size={14} />
              </ToolbarButton>
              <ToolbarButton format={BLOCK.H3} type='block'>
                <Heading3 size={14} />
              </ToolbarButton>
              <ToolbarButton format={BLOCK.H4} type='block'>
                <Heading4 size={14} />
              </ToolbarButton>
              <ToolbarButton format={BLOCK.H5} type='block'>
                <Heading5 size={14} />
              </ToolbarButton>
              <ToolbarButton format={BLOCK.H6} type='block'>
                <Heading6 size={14} />
              </ToolbarButton>
              <ToolbarButton format={BLOCK.BLOCKQUOTE} type='block'>
                <Quote size={14} />
              </ToolbarButton>
              <ToolbarButton format={BLOCK.CODEBLOCK} type='block'>
                <CurlyBraces size={14} />
              </ToolbarButton>
              <ToolbarButton format={BLOCK.UL} type='block'>
                <List size={14} />
              </ToolbarButton>
              <ToolbarButton format={BLOCK.OL} type='block'>
                <ListOrdered size={14} />
              </ToolbarButton>
            </div>
          </div>
        </div>
      </div>
      {blocksPanelOpen && <SlateToolbarBlockActions />}
    </div>
  )
}

const ToolbarButton = ({ format, type = 'mark', children }) => {
  const editor = useSlate()
  const isActive = type === 'mark' ? isMarkActive(editor, format) : isBlockActive(editor, format)
  return (
    <button
      type="button"
      size='small'
      active={isActive.toString()}
      className={`
        ${styles.button} 
        ${isActive && styles.buttonActive}
      `}
      onMouseDown={event => {
        event.preventDefault()
        if (type==='mark') {
          toggleMark(editor, format)
        } else if (type==='block') {
          toggleBlock(editor, format)
        }
      }}
    >
      {children}
    </button>
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