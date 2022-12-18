import { prisma } from '../../../lib/prisma'
import Layout, { siteTitle } from '../../../components/Layout';
import Head from 'next/head';
import Post from '../../../components/Post';
import { PostReply } from '../../../components/PostReply';
import { useSession, signIn } from 'next-auth/react';
import Button from '../../../components/Button';
import Container from '../../../components/Container';
import MainPost from '../../../components/MainPost';

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
        orderBy: [{
          createdAt: 'asc'
        }],
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
      {thread.posts.map((post, i) => (
        <div id={`post-${post.id}`} key={i}>
          {i === 0 ?
            <MainPost 
              threadTitle={thread.subject}
              content={post}
            />
          :
            <Post
              threadTitle={i === 0 ? thread.subject : null}
              content={post}
              showCreatedBy={i>0} 
              postNumber={i}
            />
          }
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