import '../styles/variables/animations.css'
import '../styles/variables/colors.css'
import '../styles/variables/typography.css'
import '../styles/variables/layout.css'
import '../styles/global.css'

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react"
import { useUIModeStore } from '../lib/UIModeStore'
import DetectDarkMode from 'detect-dark-mode'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  const storeMode = useUIModeStore(state => state.mode)
  const storeModeToggle = useUIModeStore(state => state.toggle)

  useEffect(() => {
    // 1. Application's session (default: 'light')
    let targetValue = storeMode

    // 2. Override with User's system preference, if is 'black'
    if (DetectDarkMode.isDark) {
      targetValue = 'dark'
    }

    // 3. Override with User's local storage (if available)
    if (localStorage.getItem("UIMode") !== null) {
      targetValue = localStorage.getItem('UIMode')
    }
    
    storeModeToggle(targetValue)
    document.body.className = targetValue
  }, [storeMode, storeModeToggle])

  return(
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}