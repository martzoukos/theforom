import { useEffect, useMemo } from "react";
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline, useMediaQuery } from "@mui/material"
import { createTheme } from "@mui/material/styles";
import { useUIModeStore } from '../lib/UIModeStore'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  const mode = useUIModeStore(state => state.mode)
  const modeToggle = useUIModeStore(state => state.toggle)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  
  useEffect(() => {
    modeToggle(prefersDarkMode  ? 'dark': 'light')
  }, [modeToggle, prefersDarkMode])

  const theme = useMemo(
    () => {
      return createTheme({
        palette: {
          mode,
        }
      })
    },
    [mode],
  )

  return(
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}