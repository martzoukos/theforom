import prisma from '../../lib/prisma'
import Layout from '../../components/Layout';
import Head from 'next/head';
import Post from '../../components/Post';
import ThreadTitle from '../../components/ThreadTitle';
import ThreadCreator from '../../components/ThreadCreator';
import { PostReply } from '../../components/PostReply';

export async function getServerSideProps(context) {
  const thread = await prisma.thread.findUnique({
    where: {
      id: parseInt(context.params.tid)
    },
    include: {
      User: {
        include: {
          _count: {
            select: { posts: true }
          }
        },
      },
      posts: {
        select: {
          content: true,
          createdAt: true,
          User: {
            select: {
              name: true,
              image: true,
              shortBio: true,
              _count: {
                select: { posts: true }
              }
            },
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
  return (
    <Layout>
      <Head>
        <title>{thread.subject}</title>
      </Head>
      <ThreadCreator 
        avatar={thread.User.image}
        name={thread.User.name}
        shortBio={thread.User.shortBio}
        postCount={thread.User._count.posts}
      />
      <ThreadTitle 
        title={thread.subject}
        date={thread.createdAt}
      />
      {thread.posts.map((post, i) => (
        <Post
          content={post}
          key={`post-${i}`}
          showCreatedBy={i>0}  
          withBackground={i%2 === 1}
        />
      ))}
      <PostReply thread={thread}/>
    </Layout>
  )
}

export default Thread