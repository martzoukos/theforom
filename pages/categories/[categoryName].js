import Head from 'next/head';
import Layout, { siteTitle } from '../../components/Layout';
import prisma from '../../lib/prisma'
import Link from 'next/link'
import Button from '../../components/Button';
import Container from '../../components/Container';
import { useSession, signIn } from 'next-auth/react';
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
  const router = useRouter()
  const { categoryName } = router.query
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container>
        <>
          <h1 className='as-h1'>#{categoryName}</h1>
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
    </Layout>
  );
}