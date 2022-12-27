/* eslint-disable @next/next/no-img-element */
import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from 'slate-react'
import {
  Transforms
} from 'slate'
import { Trash, UploadCloud } from 'lucide-react';
import { BLOCK } from './constants';
import { useUploadedMedia } from './SlateEditor';
import { nanoid } from 'nanoid';
import { resizeImage } from '../../lib/resizeImage';
import { uploadFile } from '../../lib/uploadFile';
import { isImageUrl } from '../../lib/isImageURL';

export const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return (element.type === BLOCK.IMG || element.type === BLOCK.UPLOADEDIMG) ? true : isVoid(element)
  }

  // This is the paste an image URL and embed functionality
  editor.insertData = async data => {
    const text = data.getData('text/plain')
    const { files } = data
    if (files && files.length > 0) {
      for (const file of files) {
        uploadAndInsertImage(editor, file)
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

export const uploadAndInsertImage = async (editor, file, alt='') => {
  const reader = new FileReader()
  const [mime] = file.type.split('/')
  if (mime === 'image') {
    const extension = file.name.split('.').pop()
    const resizedFile = await resizeImage(file, 1920, 1080, extension)
    reader.readAsDataURL(resizedFile)
    reader.addEventListener('load', async () => {
      // Add the base64 first to keep the editor UI snappy
      const base64Img = reader.result
      const uploadedMedia = useUploadedMedia.getState()
      const id = nanoid()
      uploadedMedia.upsertUploadedMedia(id, { 
        url: base64Img, 
        alt: alt
      });
      const uploadedImageEmpty = { 
        id, 
        type: BLOCK.UPLOADEDIMG,
        children: [{ text: '' }] 
      }
      Transforms.insertNodes(editor, uploadedImageEmpty);

      //Upload to S3 and then replace the url
      const imageURL = await uploadFile(resizedFile, 'posts')
      if (imageURL) {
        uploadedMedia.upsertUploadedMedia(id, { 
          url: imageURL, 
          alt: alt,
        });
      } else {
        Transforms.removeNodes(editor);
      }
    })
  }
}

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { 
    type: BLOCK.IMG, 
    url,
    alt: url, 
    children: [text] 
  }
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
          alt={element.alt}
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '20em',
            boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`
          }}
        />
        <button
          type="button"
          size='small'
          active="true"
          onMouseDown={() => { Transforms.removeNodes(editor, { at: path })} }
          style={{
            display: `${selected && focused ? 'inline' : 'none'}`,
            position: 'absolute',
            top: '0.5em',
            left: '0.5em',
          }}
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  )
}

export const UploadedImage = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)
  const uploadedMedia = useUploadedMedia(
    (state) => element.id != null && state.uploadedMedia[element.id]
  )
  const selected = useSelected()
  const focused = useFocused()
  if (uploadedMedia) {
    return (
      <div {...attributes}>
        {children}
        <div
          contentEditable={false}
          style={{ position: 'relative' }}
        >
          <img 
            alt={uploadedMedia.alt}
            src={uploadedMedia.url}
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '20em',
              boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`
            }} 
          />
          <UploadCloud 
            size={18} 
            style={{
              position: 'absolute',
              bottom: '0.5em',
              left: '0.5em',
            }}
          />
          { uploadedMedia.url.startsWith('data:image') &&
            <span>uploading...</span>
          }
          <button
            type="button"
            size='small'
            active="true"
            onMouseDown={() => { Transforms.removeNodes(editor, { at: path })} }
            style={{
              display: `${selected && focused ? 'inline' : 'none'}`,
              position: 'absolute',
              top: '0.5em',
              left: '0.5em',
            }}
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    )
  } else {
    return <p {...attributes}>
      {children}
    </p>
  }
}