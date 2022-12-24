import { useState } from 'react';
import { useRouter } from 'next/router';
import SlateEditor, { useUploadedMedia } from "./Slate/SlateEditor"
import styles from './PostReply.module.css'
import { Send } from 'lucide-react';

export const PostReply = ({thread}) => {
  const [post, setPost] = useState('')
  const [focused, setFocused] = useState(false)
  const router = useRouter()
  const uploadedMedia = useUploadedMedia()

  const handleSubmit = async event => {
    event.preventDefault()
    const body = { 
      tid: thread.id, 
      post,
      uploadedMedia: uploadedMedia.uploadedMedia
    };
    await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await router.reload()
  }

  return (
    <div className={styles.postReply}>
      <form 
        action='/api/post'
        method='post'
        onSubmit={handleSubmit}
        onFocus={() => {
          setFocused(true)
        }}
      >
        {focused &&
          <button className={styles.button}>
            <Send size={18} />
          </button>
        }
        <SlateEditor 
          value={post}
          setValue={setPost}
          focused={focused}
        />
      </form>
    </div>
  )
}