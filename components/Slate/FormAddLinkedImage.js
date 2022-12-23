import { useState } from "react"
import { Transforms } from "slate"
import { useSlateStatic } from "slate-react"
import { isImageUrl } from "../../lib/isImageURL"
import { BLOCK } from "./constants"

export default function FormAddLinkedImage() {
  const editor = useSlateStatic()
  const [url, setURL] = useState('')

  return(
    <div>
      <label htmlFor='addLinkedImageField'>
        Add the URL of the image. Use this when you want to reference some image from the web that you know will be online for a while.
      </label>
      <input 
        id='addLinkedImageField'
        value={url}
        onChange={(e) => {
          setURL(e.target.value)
        }}
      />
      <button type='button' onClick={() => {
        if (url && !isImageUrl(url)) {
          alert('URL is not an image')
          return
        }
        if (url) {
          const text = { text: '' }
          const image = { type: BLOCK.IMG, url, children: [text] }
          Transforms.insertNodes(editor, image)
        }
      }}>
        Add
      </button>
    </div>
  )
}