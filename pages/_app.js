import { createContext, useEffect, useMemo, useState } from "react";
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline, useMediaQuery } from "@mui/material"
import { createTheme } from "@mui/material/styles";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  const [mode, setMode] = useState('light')
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  useEffect(() => {
    setMode(prefersDarkMode  ? 'dark': 'light')
  }, [prefersDarkMode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    [],
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        }
      }),
    [mode],
  )

  return(
    <ColorModeContext.Provider value={colorMode}>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </ColorModeContext.Provider>
  )
}