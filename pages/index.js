import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import prisma from '../lib/prisma'
import Link from 'next/link'
import Button from '../components/Button';
import Container from '../components/Container';
import { useSession, signIn } from 'next-auth/react';
import ThreadsTable from '../components/ThreadsTable';
import CategoriesList from '../components/CategoriesList';

export async function getServerSideProps() {
  const threads = await prisma.thread.findMany({
    include: {
      User:{
        select: {
          name: true,
          image: true,
        }
      },
      categories: {
        select: {
          Category: true
        }
      },
      posts: {
        select: {
          User: {
            select: {
              image: true,
              name: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
      },
      _count: {
        select: { posts: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const categories =  await prisma.category.findMany({
    select: {
      name: true,
      _count: {
        select: { threads: true }
      }
    }
  })

  return {
    props: {
      allThreads: threads,
      allCategories: categories,
    },
  };
}

export default function Home({ allThreads, allCategories }) {
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
            <br/>
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
        <CategoriesList categories={allCategories} />
      </Container>
    </Layout>
  );
}