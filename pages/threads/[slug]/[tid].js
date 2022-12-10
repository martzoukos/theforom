import { prisma } from '../../../lib/prisma'
import Layout, { siteTitle } from '../../../components/Layout';
import Head from 'next/head';
import Post from '../../../components/Post';
import ThreadTitle from '../../../components/ThreadTitle';
import ThreadCreator from '../../../components/ThreadCreator';
import { PostReply } from '../../../components/PostReply';
import { useSession, signIn } from 'next-auth/react';
import Button from '../../../components/Button';
import Container from '../../../components/Container';

export async function getServerSideProps(context) {
  const thread = await prisma.thread.findFirst({
    where: {
      id: parseInt(context.params.tid),
      slug: context.params.slug.toLowerCase()
    } ,
    include: {
      User: {
        include: {
          _count: {
            select: { posts: true }
          }
        },
      },
      categories: {
        select: {
          Category: {
            select: {
              name: true
            }
          }
        }
      },
      posts: {
        select: {
          id: true,
          content: true,
          uploadedMedia: true,
          createdAt: true,
          User: {
            select: {
              handle: true,
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
  const { data: session } = useSession()
  return (
    <Layout>
      <Head>
        <title>{thread.subject} - {siteTitle}</title>
      </Head>
      <ThreadCreator 
        avatar={thread.User.image}
        handle={thread.User.handle}
        name={thread.User.name}
        shortBio={thread.User.shortBio}
        postCount={thread.User._count.posts}
      />
      <ThreadTitle 
        title={thread.subject}
        date={thread.createdAt}
        categories={thread.categories}
      />
      {thread.posts.map((post, i) => (
        <div id={`post-${post.id}`} key={i}>
          <Post
            content={post}
            showCreatedBy={i>0} 
            postNumber={i}
          />
        </div>
      ))}
      {session ?
        <PostReply thread={thread}/>
      :
        <Container>
          <Button onClick={() => signIn()}>Connect to post a reply</Button>
        </Container>
      }
    </Layout>
  )
}

export default Thread