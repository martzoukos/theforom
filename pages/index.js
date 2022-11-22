import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import prisma from '../lib/prisma'
import Link from 'next/link'
import Button from '../components/Button';
import Container from '../components/Container';
import { useSession, signIn } from 'next-auth/react';
import ThreadsTable from '../components/ThreadsTable';

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
        <>
          <h1 className='as-h1'>The Forums are back.</h1>
          <ThreadsTable threads={allThreads} />
          <div>
            { session ?
              <Link href='/threads/new'>Create a new Thread</Link>
              :  
              <Button variant='contained' onClick={() => signIn()}>Connect to create a Thread</Button>
            }
          </div>
        </>
      </Container>
      <Container>
        <h2 className='as-h2'>Browse the categories</h2>
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