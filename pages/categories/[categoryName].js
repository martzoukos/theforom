import Head from 'next/head';
import Layout, { siteTitle } from '../../components/Layout';
import { prisma } from '../../lib/prisma'
import Button from '../../components/Button';
import Container from '../../components/Container';
import ThreadsTable from '../../components/ThreadsTable';
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
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
    where: {
      categories: {
        some: {
          Category: {
            name: context.params.categoryName 
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return {
    props: {
      allThreads: threads,
    },
  };
}

export default function Home({ allThreads }) {
  const session = null //replace with clerk
  const router = useRouter()
  const { categoryName } = router.query
  return (
    <Layout>
      <Head>
        <title>#{categoryName} - {siteTitle}</title>
      </Head>
      <Container>
        <>
          <h1 className='as-h1'>#{categoryName}</h1>
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
    </Layout>
  );
}