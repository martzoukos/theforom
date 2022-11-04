import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import prisma from '../lib/prisma'
import Link from 'next/link'

export async function getServerSideProps() {
  const threads = await prisma.thread.findMany({
    include: {
      User:{
        select: {
          name: true,
          email: true,
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
      <section>
        <h1>Threads </h1>
        <ul>
          {allThreads.map((thread, i) => (
            <li key={`thread-${i}`}>
              <Link href={`/threads/${thread.id}`}>{thread.subject}</Link>
              ({thread._count.posts} posts)
              by &nbsp;
              {thread.User.email}
            </li>
            ))}
        </ul>
        <Link href='/threads/new'>Create a new Thread</Link>
      </section>
    </Layout>
  );
}