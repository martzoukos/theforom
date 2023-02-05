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
import { useUIModeStore } from '../lib/UIModeStore'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';

TimeAgo.addDefaultLocale(en)

//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages = [];

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

  // Get the pathname
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  return(
    <ClerkProvider {...pageProps} >
      {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
      )}
    </ClerkProvider>
  )
}