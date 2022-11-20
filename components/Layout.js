import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Head from 'next/head';
import { useContext } from 'react';
import { ColorModeContext } from '../pages/_app';
import styles from './Layout.module.css';
import LogInBtn from './LoginBtn';
import Logo from './Logo';
import { Moon, Sun } from 'lucide-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export const siteTitle = 'The Forom';

export default function Layout({ children }) {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const { data: session } = useSession()

  const handleModeSwitch = (newMode) => {
    const uid = session.user.id
    colorMode.toggleColorMode()
    axios.post(`/api/users/${[uid]}/uiMode`, {
      uid,
      uiMode: newMode
    })
  }
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
      <header className={styles.header}>        
        <Logo />
        <LogInBtn />
      </header>
      <main className={styles.container}>
        {children}
      </main>
      <footer>
        {theme.palette.mode} mode
        <IconButton 
          sx={{ ml: 1 }} 
          onClick={() => handleModeSwitch(theme.palette.mode === 'dark' ? 'light' : 'dark')} 
          color='inherit'
        >
          {theme.palette.mode === 'dark' ? <Sun /> : <Moon />}
        </IconButton>
      </footer>
    </>
  );
}