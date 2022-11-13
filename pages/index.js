import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import prisma from '../lib/prisma'
import Link from 'next/link'
import { List, ListItem, Container, Avatar } from '@mui/material';

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
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container>
        <h1>Threads </h1>
        <List>
          {allThreads.map((thread, i) => (
            <Link href={`/threads/${thread.id}`} key={`thread-${i}`}>
              <ListItem>
                {thread.User.image &&
                  <Avatar alt={thread.User.name} src={thread.User.image} />
                }
                {thread.subject}
                ({thread._count.posts} posts)
              </ListItem>
            </Link>
            ))}
        </List>
        <Link href='/threads/new'>Create a new Thread</Link>
      </Container>
    </Layout>
  );
}