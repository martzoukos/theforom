import Head from 'next/head';
import Layout from '../../components/Layout'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Editor, { useUploadedMedia } from '../../components/Slate/SlateEditor';
import { useSession, signIn } from 'next-auth/react';
import Button from '../../components/Button';
import Container from '../../components/Container';

export default function Thread() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()
  const { data: session } = useSession()
  const uploadedMedia = useUploadedMedia()

  const handleSubmit = async event => {
    event.preventDefault()
    const body = { 
      title, 
      content,
      uploadedMedia: uploadedMedia.uploadedMedia
    };
    const res = await fetch('/api/thread', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    await router.push(`/threads/${data.id}`)
  }

  if (session) {
    return (
      <Layout>
        <Head>
          <title>Create your first thread</title>
        </Head>
        <Container maxWidth='md'>
          <form action='/api/thread' method='post' onSubmit={handleSubmit}>
            <label htmlFor='title'>Title</label>
            <input 
              type='text' 
              name='title' 
              id='title'
              placeholder='Thread title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <br/>
            <Editor value={content} setValue={setContent}/>
            <br/>
            <button type='submit'>Publish your Thread</button>
          </form>
        </Container>
      </Layout>
    )
  } else {
    return(
      <Container>          
        <Button variant='contained' onClick={() => signIn()}>Connect to create a Thread</Button>
      </Container>
    )
  }
}