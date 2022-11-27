import { useState } from 'react';
import { useRouter } from 'next/router';
import SlateEditor, { useUploadedMedia } from "./Slate/SlateEditor"
import Button from './Button';
import Container from './Container';

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
    <Container isNarrow={true}>
      <form 
        action='/api/post'
        method='post'
        onSubmit={handleSubmit}
      >
        <h2 className='as-h2'>Reply to this thread</h2>
        <SlateEditor value={post} setValue={setPost} />
        <br/>
        <Button>
          Add a post
        </Button>
      </form>
    </Container>
  )
}