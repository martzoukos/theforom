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
        <h1>The Forums are back.</h1>
        <table>
          <thead>
            <th>Topic</th>
            <th>Categories</th>
            <th>Replies</th>
            <th>Latest</th>
          </thead>
          <tbody>
            {allThreads.map((thread, i) => (
              <tr key={i}>
                <td>
                  <Avatar alt={thread.User.name} src={thread.User.image} />
                  {thread.subject}
                  {thread.User.name}
                  {new Date(thread.createdAt).toLocaleString()}
                </td>
                <td>
                  #animals
                  <br/>
                  #questions
                  <br/>
                  #general
                </td>
                <td>
                  {thread._count.posts}
                  <br/>
                  Replies
                </td>
                <td>
                  <Avatar alt={thread.User.name} src={thread.User.image} />
                  <Avatar alt={thread.User.name} src={thread.User.image} />
                  <br/>
                  {new Date(thread.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {session ?
          <Link href='/threads/new'>Create a new Thread</Link>
          :  
          <Button variant='contained' onClick={() => signIn()}>Connect to create a Thread</Button>
        }
      </Container>
      <Container>
        <h2>Browse the categories</h2>
        <div>
          #answers (2)
          #questions (3)
          #animals (1)
          #cars (2432)
          #politics (214)
          #answers (2)
          #questions (3)
          #animals (1)
          #cars (2432)
          #politics (214)
          #answers (2)
          #questions (3)
          #animals (1)
          #cars (2432)
          #politics (214)
          #answers (2)
          #questions (3)
          #animals (1)
          #cars (2432)
          #politics (214)
        </div>
      </Container>
    </Layout>
  );
}