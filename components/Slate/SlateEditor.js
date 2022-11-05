import React, { useMemo, useCallback } from 'react';
import { 
  createEditor, 
  Editor,
  Transforms, 
  Element as SlateElement 
} from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import { isHotkey } from 'is-hotkey'
import {
  withInlines,
  AddLinkButton,
  RemoveLinkButton,
  LinkComponent,
} from './links'
import {
  Image, 
  InsertImageButton,
  withImages,
} from './images'
import {
  Video, 
  InsertVideoButton,
  withVideos,
} from './videos'
import styles from './SlateEditor.module.css'
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  Heading4, 
  Heading5, 
  Heading6, 
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Quote,
  List,
  ListOrdered,
} from 'lucide-react';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  'mod+opt+1': 'heading-one',
  'mod+opt+2': 'heading-two',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const SlateEditor = ({ setValue }) => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withVideos(withImages(withInlines(withHistory(withReact(createEditor()))))), 
    []
  );  
  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={setValue}
      className={styles.slateEditor}
    >
      <Toolbar>
        <MarkButton format="bold">
          <Bold />
        </MarkButton>
        <MarkButton format="italic">
          <Italic />
        </MarkButton>
        <MarkButton format="underline">
          <Underline />
        </MarkButton>
        <MarkButton format="strikethrough">
          <Strikethrough />
        </MarkButton>
        <BlockButton format="heading-one">
          <Heading1 />
        </BlockButton>
        <BlockButton format="heading-two">
          <Heading2 />
        </BlockButton>
        <BlockButton format="heading-three">
          <Heading3 />
        </BlockButton>
        <BlockButton format="heading-four">
          <Heading4 />
        </BlockButton>
        <BlockButton format="heading-five">
          <Heading5 />
        </BlockButton>
        <BlockButton format="heading-six">
          <Heading6 />
        </BlockButton>
        <BlockButton format="block-quote">
          <Quote />
        </BlockButton>
        <BlockButton format="bulleted-list">
          <List />
        </BlockButton>
        <BlockButton format="numbered-list">
          <ListOrdered />
        </BlockButton>
        <BlockButton format="left">left
        </BlockButton>
        <BlockButton format="center">center
        </BlockButton>
        <BlockButton format="right">right
        </BlockButton>
        <BlockButton format="justify">justify
        </BlockButton>
        <AddLinkButton />
        <RemoveLinkButton />
        <InsertImageButton />
        <InsertVideoButton />
      </Toolbar>
      <Editable 
        renderLeaf={renderLeaf} 
        renderElement={renderElement}
        className={styles.editable}
        onKeyDown={event => {
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
    </Slate>
  );
};

/////////////
// MARKS
/////////////
const MarkButton = ({ format, children }) => {
  const editor = useSlate()
  const isActive = isMarkActive(editor, format)
  return (
    <button
      type="button"
      active={isActive.toString()}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
      className={styles.button}
      style={{
        fontWeight: isActive ? 'bold' : 'normal'
      }}
    >
      {children}
    </button>
  )
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

/////////////
// BLOCKS
/////////////
const BlockButton = ({ format, children }) => {
  const editor = useSlate()
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  return (
    <button
      type='button'
      active={isActive.toString()}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
      className={styles.button}
      style={{
        fontWeight: isActive ? 'bold' : 'normal'
      }}
    >
      {children}
    </button>
  )
}

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )
  return !!match
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
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

const Toolbar =({children}) => {
  const editor = useSlate()
  return (
    <div className={styles.toolbar}>
      {children}
    </div>
  )
}

/////////////
// INITIAL VALUE
/////////////
const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: '' },
    ],
  },
];

export default SlateEditor;