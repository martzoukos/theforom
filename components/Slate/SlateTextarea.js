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
import { Editable, ReactEditor } from "slate-react"
import { Editor, Node } from 'slate';
import { BLOCK, HOTKEYS, INLINE, MARKDOWN_SHORTCUTS } from './constants'
import { useStore } from './SlateEditor';
import isUrl from 'is-url';
import { LinearProgress } from '@mui/material';

export const SlateTextarea = ({editor}) => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  // This is to avoid an Android input bug
  // PR: https://github.com/ianstormtaylor/slate/pull/4988
  const handleDomBeforeInput = useCallback((e) => {
    queueMicrotask(() => {
      const pendingDiffs = ReactEditor.androidPendingDiffs(editor)
      const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
        if (!diff.text.endsWith(' ')) {
          return false
        }
  
        const { text } = Node.leaf(editor, path)
        const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1)
        if (!(beforeText in MARKDOWN_SHORTCUTS)) {
          return
        }
  
        const blockEntry = Editor.above(editor, {
          at: path,
          match: n => Editor.isBlock(editor, n),
        })
        if (!blockEntry) {
          return false
        }
  
        const [, blockPath] = blockEntry
        return Editor.isStart(editor, Editor.start(editor, path), blockPath)
      })
  
      if (scheduleFlush) {
        ReactEditor.androidScheduleFlush(editor)
      }
    })
  }, [editor])

  return <Editable 
    renderLeaf={renderLeaf} 
    renderElement={renderElement}
    className={styles.editable}
    onDOMBeforeInput={handleDomBeforeInput}
    onKeyDown={event => {      
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
          event.preventDefault()
          const mark = HOTKEYS[hotkey]
          if ([
            INLINE.BOLD, 
            INLINE.ITALIC, 
            INLINE.UNDERLINE, 
            INLINE.STRIKETHROUGH,
          ].includes(mark)) {
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
  const entity = useStore(
    (state) => element.id != null && state.entities[element.id]
  )
  if (entity) {
    return (
      <figure {...attributes} contentEditable={false}>
        <img alt='' src={entity.url} />
        { !isUrl(entity.url) &&
          <LinearProgress size={20} />
        }
        {children}
      </figure>
    );
  }

  switch (element.type) {
    case BLOCK.BLOCKQUOTE:
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case BLOCK.UL:
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case BLOCK.OL:
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    case BLOCK.LI:
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case BLOCK.H1:
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case BLOCK.H2:
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case BLOCK.H3:
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      )
    case BLOCK.H4:
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      )
    case BLOCK.H5:
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      )
    case BLOCK.H6:
      return (
        <h6 style={style} {...attributes}>
          {children}
        </h6>
      )
    case INLINE.LINK:
      return <LinkComponent {...{ attributes, children, element }} />
    case BLOCK.IMG:
      return <Image {...{ attributes, children, element }} />
    case BLOCK.VIDEO:
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
  if (leaf[INLINE.BOLD]) {
    children = <strong>{children}</strong>
  }

  if (leaf[INLINE.ITALIC]) {
    children = <em>{children}</em>
  }

  if (leaf[INLINE.UNDERLINE]) {
    children = <u>{children}</u>
  }

  if (leaf[INLINE.STRIKETHROUGH]) {
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