import Head from 'next/head';
import Layout from '../../components/layout'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Editor from '../../components/slate/slateEditor';

export default function Thread() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    const body = { title, content };
    const res = await fetch('/api/thread', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    await router.push(`/threads/${data.id}`)
  }

  return (
    <Layout>
      <Head>
        <title>Create your first thread</title>
      </Head>
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
    </Layout>
  );
}