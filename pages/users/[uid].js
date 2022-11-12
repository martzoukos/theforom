import prisma from '../../lib/prisma'
import Layout from '../../components/Layout';
import Head from 'next/head';
import { UserHeader } from '../../components/UserHeader';
import { UserPosts } from '../../components/UserPosts';

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
      <UserPosts posts={user.posts} />
    </Layout>
  )
}

export default User