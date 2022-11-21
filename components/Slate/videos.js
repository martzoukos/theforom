import urlParser from "js-video-url-parser";
import {
  useSlateStatic,
  ReactEditor,
} from 'slate-react'
import {
  Transforms
} from 'slate'
import { Video as VideoIcon } from "lucide-react";
import Button from "../Button";
import { BLOCK } from "./constants";

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

  const embedYoutubeURL = urlParser.parse(element.url)
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
      >
        <iframe 
          style={{
            display: 'block',
            width: '100%',
            height: '20em',
          }}
          src={`https://www.youtube.com/embed/${embedYoutubeURL.id}`} 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen   
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

export const InsertVideoButton = () => {
  const editor = useSlateStatic()
  return (
    <Button
      type='button'
      variant='outlined'
      size='small'
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the video:')
        if (url && !isVideoUrl(url)) {
          alert('URL is not an video')
          return
        }
        url && insertVideo(editor, url)
      }}
    >
      <VideoIcon size={18} />
    </Button>
  )
}

const isVideoUrl = url => {
  if (!url) return false
  return !!urlParser.parse(url)
}