import React, { useCallback } from 'react';
import { isHotkey } from 'is-hotkey'
import { LinkComponent } from './links'
import { Image } from './images'
import { Video } from './videos'
import styles from './SlateEditor.module.css'
import { 
  toggleBlock,
  toggleMark,
} from './SlateToolbar';
import { Editable, useEditor } from "slate-react"
import { Editor, Range, Transforms } from 'slate';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+shift+s': 'strikethrough',
  'mod+shift+1': 'heading-one',
  'mod+shift+2': 'heading-two',
  'mod+shift+3': 'heading-three',
  'mod+shift+4': 'heading-four',
  'mod+shift+5': 'heading-five',
  'mod+shift+6': 'heading-six',
}

export const SlateTextarea = ({editor}) => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  return <Editable 
    renderLeaf={renderLeaf} 
    renderElement={renderElement}
    className={styles.editable}
    onKeyDown={event => {
      // Markdown like shortcut
      // Better use this: https://github.com/ianstormtaylor/slate/blob/main/site/examples/markdown-shortcuts.tsx
      if (event.key === ' ' && editor.selection && Range.isCollapsed(editor.selection)) {
        const { selection } = editor
        // If space is entered on the:
        // - second character in the line (so after the modifier char)
        // - first leaf node in this line (so not towards the end of the line)
        if (selection.focus.offset === 1 && selection.focus.path[1] === 0) {
          const anchorText = Editor.leaf(editor, selection.focus)
          if (anchorText[0].text === '-') {
            toggleBlock(editor, 'bulleted-list')
          }
        }
      }
      
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
          event.preventDefault()
          const mark = HOTKEYS[hotkey]
          if (['bold', 'italic', 'underline', 'strikethrough'].includes(mark)) {
            toggleMark(editor, mark)
          } else {
            toggleBlock(editor, mark)
          }
        }
      }
    }}
  />
}

/////////////
// REACT COMPONENTS
/////////////
const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'heading-three':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      )
    case 'heading-four':
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      )
    case 'heading-five':
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      )
    case 'heading-six':
      return (
        <h6 style={style} {...attributes}>
          {children}
        </h6>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    case 'link':
      return <LinkComponent {...{ attributes, children, element }} />
    case 'image':
      return <Image {...{ attributes, children, element }} />
    case 'video':
      return <Video {...{ attributes, children, element }} />
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }

  return(
    <span
      // The following is a workaround for a Chromium bug where,
      // if you have an inline at the end of a block,
      // clicking the end of a block puts the cursor inside the inline
      // instead of inside the final {text: ''} node
      // https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
      style={
        leaf.text === ''
          ? {paddingLeft: '0.1px'}
          : null
      }
      {...attributes}
    >
      {children}
    </span>
  )
}