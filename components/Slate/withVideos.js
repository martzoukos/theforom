import urlParser from "js-video-url-parser";
import {
  useSlateStatic,
  ReactEditor,
} from 'slate-react'
import {
  Transforms
} from 'slate'
import { BLOCK } from "./constants";
import { getEmbedVideoURL } from "../BlockVideo";

export const withVideos = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === BLOCK.VIDEO ? true : isVoid(element)
  }

  // This is the paste a youtube URL and embed functionality
  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (isVideoUrl(text)) {
      insertVideo(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertVideo = (editor, url) => {
  const text = { text: '' }
  const video = { type: BLOCK.VIDEO, url, children: [text] }
  Transforms.insertNodes(editor, video)
}

export const Video = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)

  const parsedURL = urlParser.parse(element.url)
  const embedURL = getEmbedVideoURL(parsedURL)

  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
      >
        <iframe 
          src={embedURL} 
          style={{
            display: 'block',
            width: '100%',
            height: '20em',
          }}
          frameborder="0" 
          allowfullscreen="true" 
          scrolling="no"   
        />
        <button
          type="button"
          active="true"
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          style={{
            display: 'block',
          }}
        >
          Remove this video
        </button>
      </div>
    </div>
  )
}

const isVideoUrl = url => {
  if (!url) return false
  return !!urlParser.parse(url)
}