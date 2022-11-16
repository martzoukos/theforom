/* eslint-disable @next/next/no-img-element */
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
import { Image as ImageIcon, Trash } from 'lucide-react';
import { Button } from '@mui/material';
import { BLOCK } from './constants';
import { useStore } from './SlateEditor';
import { nanoid } from 'nanoid';
import { resizeImage } from '../../lib/resizeImage';
import axios from 'axios';

export const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === BLOCK.IMG ? true : isVoid(element)
  }

  // This is the paste an image URL and embed functionality
  editor.insertData = async data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          const resizedFile = await resizeImage(file, 1920, 1080, 'jpg')
          reader.readAsDataURL(resizedFile)
          reader.addEventListener('load', async () => {
            // Add the base64 first to keep the editor UI snappy
            const base64Img = reader.result
            const entityState = useStore.getState()
            const id = nanoid()
            entityState.upsertEntity(id, { url: base64Img });
            Transforms.insertNodes(editor, { id, children: [{ text: '' }] });

            //Upload to S3 and then replace the url
            const { data } = await axios.post('/api/s3/uploadFile', {
              name: resizedFile.name,
              type: resizedFile.type,
            })
            const url = data.url
            const res = await axios.put(data.url, file, {
              headers: {
                'Content-type': file.type,
                'Access-Control-Allow-Origin': '*',
              }
            })
            if (res.status === 200) {
              entityState.upsertEntity(id, { url: process.env.NEXT_PUBLIC_S3_BUCKET_URL + file.name });
            } else {
              Transforms.removeNodes(editor);
            }
          })
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
  const image = { type: BLOCK.IMG, url, children: [text] }
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
          alt=''
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '20em',
            boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`
          }}
        />
        <Button
          type="button"
          size='small'
          active="true"
          variant='contained'
          onMouseDown={() => { Transforms.removeNodes(editor, { at: path })} }
          style={{
            display: `${selected && focused ? 'inline' : 'none'}`,
            position: 'absolute',
            top: '0.5em',
            left: '0.5em',
          }}
        >
          <Trash size={18} />
        </Button>
      </div>
    </div>
  )
}

export const InsertImageButton = () => {
  const editor = useSlateStatic()
  return (
    <Button
      type='button'
      variant='outlined'
      size='small'
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
      <ImageIcon size={18} />
    </Button>
  )
}

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}