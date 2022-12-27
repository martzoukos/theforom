import {
  useSlateStatic,
  ReactEditor,
} from 'slate-react'
import {
  Transforms
} from 'slate'
import { BLOCK } from "./constants";
import { FacebookEmbed, InstagramEmbed, TwitterEmbed } from 'react-social-media-embed';

export const withSocials = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === BLOCK.SOCIAL ? true : isVoid(element)
  }

  // This is the paste a social URL and embed functionality
  editor.insertData = data => {
    const text = data.getData('text/plain')
    const socialProvider = getSocialProvider(text)
    if (!!socialProvider) {
      insertSocial(editor, text, socialProvider)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertSocial = (editor, url, provider) => {
  const text = { text: '' }
  const social = { type: BLOCK.SOCIAL, url, provider, children: [text] }
  Transforms.insertNodes(editor, social)
}

export const Social = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
      >
        {element.provider === 'twitter' &&
          <TwitterEmbed url={element.url} />
        }
        {element.provider === 'facebook' &&
          <FacebookEmbed url={element.url} />
        }
        {element.provider === 'instagram' &&
          <InstagramEmbed url={element.url} />
        }
        <button
          type="button"
          active="true"
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          style={{
            display: 'block',
          }}
        >
          Remove this Embed
        </button>
      </div>
    </div>
  )
}

const getSocialProvider = url => {
  if (/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(url)) {
    return 'twitter'
  }
  if (/http(?:s)?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9_]+)/.test(url)) {
    return 'facebook'
  }
  if (/http(?:s)?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/.test(url)) {
    return 'instagram'
  }
  return false
}