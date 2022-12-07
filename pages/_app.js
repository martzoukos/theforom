import '../styles/variables/animations.css'
import '../styles/variables/colors.css'
import '../styles/variables/typography.css'
import '../styles/variables/layout.css'
import '../styles/global.css'
import '../styles/headlines.css'
import '../styles/forms.css'
import '../styles/typography.css'
import '../styles/third-party/react-bootstrap-typeahead.css'


import { useEffect } from "react";
import { SessionProvider } from "next-auth/react"
import { useUIModeStore } from '../lib/UIModeStore'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  const storeMode = useUIModeStore(state => state.mode)
  const storeModeToggle = useUIModeStore(state => state.toggle)

  useEffect(() => {
    // Override with User's local storage (if available)
    let targetValue = storeMode
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