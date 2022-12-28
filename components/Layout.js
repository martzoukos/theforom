import Head from 'next/head';
import Container from './Container';
import Footer from './Footer';
import HeaderNavigation from './HeaderNavigation';

export const siteTitle = 'the forom';

export default function Layout({ children, layout }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="The Forom is a lively and vibrant community where users can let their voices be heard and share their thoughts and opinions on a wide range of topics. It's a place where ideas are exchanged, discussions are had, and friendships are formed. Whether you're an expert on a particular subject or just looking to learn more, The Forom has something for everyone. So why not stop by and join the conversation today?"
        />
        <meta property="og:image" content='/ogimage.png' />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <HeaderNavigation />
      <Container isNarrow={layout === 'narrow'}>
        {children}
      </Container>
      <Footer />
    </>
  );
}