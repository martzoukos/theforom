import { 
  Editor, 
  Range,
  Transforms,
  Element as SlateElement 
} from 'slate'
import { 
  useSlate,
  useSelected 
} from "slate-react"
import isUrl from 'is-url'
import styles from './SlateEditor.module.css';

// Use this in the initialization createEditor() function
export const withInlines = editor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element =>
    ['link', 'button'].includes(element.type) || isInline(element)

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

// Utility function to insert the link when the toolbar button is clicked
const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

// Utility function to check if the link is active
const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
  return !!link
}

// Utility function to remove the link styling
const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
}

// Utility function to wrap a text in link
const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }
  
  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    style={{
      fontSize: 0
    }}
  >
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)

// The React component that renders the link in the Editor
export const LinkComponent = ({ attributes, children, element }) => {
  const selected = useSelected()
  return (
    <a
      {...attributes}
      href={element.url}
      style={
        selected
          ? {boxShadow: '0 0 0 3px #ddd'}
          : null
      }
      onDoubleClick={() => {
        window.open(element.url, '_blank')
      }}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  )
}

// The Toolbar button to add a link
export const AddLinkButton = () => {
  const editor = useSlate()
  return (
    <button
      type="button"
      className={styles.button}
      active={isLinkActive(editor).toString()}
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the link:')
        if (!url) return
        insertLink(editor, url)
      }}
    >
    🔗
    </button>
  )
}

// The Toolbar button to remove the link
export const RemoveLinkButton = () => {
  const editor = useSlate()

  return (
    <button
      type="button"
      className={styles.button}
      active={isLinkActive(editor).toString()}
      onMouseDown={event => {
        if (isLinkActive(editor)) {
          unwrapLink(editor)
        }
      }}
    >
      x🔗
    </button>
  )
}