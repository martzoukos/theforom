import prisma from '../../lib/prisma'
import Layout from '../../components/Layout';
import Head from 'next/head';
import { UserHeader } from '../../components/UserHeader';
import UserPost from '../../components/UserPost';
import Container from '../../components/Container';

export async function getServerSideProps(context) {
  const user = await prisma.user.findUnique({
    where: {
      id: context.params.uid
    },
    include: {
      _count: {
        select: { posts: true }
      },
      posts: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          Thread: {
            select: {
              id: true,
              subject: true,
            }
          }
        },
      }
    }
  })
  return {
    props: {
      user: user,
    },
  };
}

const User = ({ user }) => {  
  return (
    <Layout>
      <Head>
        <title>{user.name}</title>
      </Head>
      <UserHeader user={user} />
      <Container>
        <h2 className='as-h2'>Posts</h2>
        {user.posts.map((post, i) => <UserPost post={post} key={i} />)}
      </Container>
    </Layout>
  )
}

export default User