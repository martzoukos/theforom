import Head from 'next/head';
import Layout from '../components/Layout';
import { prisma } from '../lib/prisma'
import Button from '../components/Button';
import Container from '../components/Container';
import ThreadsTable from '../components/ThreadsTable';
import CategoriesList from '../components/CategoriesList';

export async function getServerSideProps() {
  const threads = await prisma.thread.findMany({
    include: {
      User:{
        select: {
          name: true,
          handle: true,
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
              handle: true,
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
  const session = null //replace with clerk
  return (
    <Layout>
      <Head>
        <title>Welcome to the forom, friend!</title>
      </Head>
      <Container>
        <>
          <h1 className='as-h1'>The Forums are back.</h1> 
          <ThreadsTable threads={allThreads} />
          <div style={{
            marginTop: '2em'
          }}>
            { session ?
              <Button href='/threads/new'>Create a new Thread</Button>
              :  
              <Button>Connect to create a Thread</Button>
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