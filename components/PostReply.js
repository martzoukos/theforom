import { useState } from 'react';
import { useRouter } from 'next/router';
import SlateEditor, { useUploadedMedia } from "./Slate/SlateEditor"
import styles from './PostReply.module.css'
import Button from './Button';

export const PostReply = ({thread}) => {
  const [post, setPost] = useState('')
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
    <form 
      action='/api/post'
      method='post'
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <h2 className={styles.header}>Reply to this thread</h2>
      <div className={styles.editor}>
        <SlateEditor value={post} setValue={setPost} />
      </div>
      <Button
        type='submit'
        color='primary'
        variant='contained'
      >
        Add a post
      </Button>
    </form>
  )
}