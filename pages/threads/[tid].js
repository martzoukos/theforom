import prisma from '../../lib/prisma'
import Layout from '../../components/Layout';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SlateEditor from '../../components/Slate/SlateEditor';
import Post from '../../components/Post';
import ThreadTitle from '../../components/ThreadTitle';

export async function getServerSideProps(context) {
  const thread = await prisma.thread.findUnique({
    where: {
      id: parseInt(context.params.tid)
    },
    include: {
      posts: {
        select: {
          content: true,
          createdAt: true,
          User: {
            select: {
              name: true,
              email: true,
            }
          }
        }
      }
    }
  })
  return {
    props: {
      thread: thread,
    },
  };
}

const Thread = ({ thread }) => {
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
    <Layout>
      <Head>
        <title>{thread.subject}</title>
      </Head>
      <ThreadTitle 
        title={thread.subject}
        date={thread.createdAt}
      />
      <div>
        {thread.posts.map((post, i) => (
          <Post
            content={post}
            key={`post-${i}`}
            showCreatedBy={i>0}  
          />
        ))}
      </div>
      <div style={{ border: '1px solid #CCC' }}>
        <form action='/api/post' method='post' onSubmit={handleSubmit}>
          <SlateEditor value={post} setValue={setPost}/>
          <button type='submit'>Add a Post</button>
        </form>
      </div>
    </Layout>
  )
}

export default Thread