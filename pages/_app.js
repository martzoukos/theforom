import '../styles/global.css'
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react"
import { useUIModeStore } from '../lib/UIModeStore'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  const storeMode = useUIModeStore(state => state.mode)
  const storeModeToggle = useUIModeStore(state => state.toggle)

  useEffect(() => {
    const localMode = (localStorage.getItem("UIMode") !== null)
      ? localStorage.getItem('UIMode')
      : null
    storeModeToggle(localMode)
    document.body.className = localMode ? localMode : storeMode
  }, [storeMode, storeModeToggle])

  return(
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}