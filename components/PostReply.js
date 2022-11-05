import { useState } from 'react';
import { useRouter } from 'next/router';
import SlateEditor from "./Slate/SlateEditor"
import styles from './PostReply.module.css'

export const PostReply = ({thread}) => {
  const [post, setPost] = useState('')
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    const body = { tid: thread.id, post };
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
      <SlateEditor value={post} setValue={setPost}/>
      <button type='submit'>Add a Post</button>
    </form>
  )
}