import isUrl from 'is-url'
import imageExtensions from'image-extensions'
import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from 'slate-react'
import {
  Transforms
} from 'slate'

export const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  // This is the paste an image URL and embed functionality
  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}

export const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)

  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        style={{ position: 'relative' }}
      >
        <img
          src={element.url}
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '20em',
            boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`
          }}
        />
        <button
          type="button"
          active="true"
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          style={{
            display: `${selected && focused ? 'inline' : 'none'}`,
            position: 'absolute',
            top: '0.5em',
            left: '0.5em',
            backgroundColor: 'white',
          }}
        >
          X
        </button>
      </div>
    </div>
  )
}

export const InsertImageButton = () => {
  const editor = useSlateStatic()
  return (
    <button
      type="button"
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the image:')
        if (url && !isImageUrl(url)) {
          alert('URL is not an image')
          return
        }
        url && insertImage(editor, url)
      }}
    >
      🖼️
    </button>
  )
}

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}