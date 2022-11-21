import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import prisma from '../lib/prisma'
import Link from 'next/link'
import Button from '../components/Button';
import Container from '../components/Container';
import Avatar from '../components/Avatar';
import { useSession, signIn } from 'next-auth/react';

export async function getServerSideProps() {
  const threads = await prisma.thread.findMany({
    include: {
      User:{
        select: {
          name: true,
          image: true,
        }
      },
      _count: {
        select: { posts: true }
      }
    }
  })
  return {
    props: {
      allThreads: threads,
    },
  };
}

export default function Home({ allThreads }) {
  const { data: session } = useSession()
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container>
        <h1>Threads </h1>
        <ul>
          {allThreads.map((thread, i) => (
            <li href={`/threads/${thread.id}`} key={`thread-${i}`}>
                {thread.User.image &&
                  <Avatar alt={thread.User.name} src={thread.User.image} />
                }
                {thread.subject}
                ({thread._count.posts} posts)
            </li>
            ))}
        </ul>
        {session ?
          <Link href='/threads/new'>Create a new Thread</Link>
          :
          <Container>          
            <Button variant='contained' onClick={() => signIn()}>Connect to create a Thread</Button>
          </Container>
        }
      </Container>
    </Layout>
  );
}