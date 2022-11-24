import Head from 'next/head';
import Link from 'next/link';
import Footer from './Footer';
import HeaderNavigation from './HeaderNavigation';
import Logo from './Logo';
import { UIModeSwitcher } from './UIModeSwitcher';

export const siteTitle = 'The Forom';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="The forums are back"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <HeaderNavigation />
      {children}
      <Footer />
    </>
  );
}