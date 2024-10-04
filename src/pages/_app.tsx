import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../config/theme'
import createEmotionCache from '../config/createEmotionCache'
import { AuthContextProvider } from '../context/AuthContext'
import AppBar from '../components/AppBar'
import Copyright from '../components/Copyright'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <AuthContextProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Vereda</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
          <meta name="theme-color" content="#1a202c" />
          <meta
            name="description"
            content="Aplicativo para acompanhamento de objetivos de aprendizagem"
          />
          <link rel="icon" href="/favicon.ico"></link>
          <title>Vereda - App para acompanhamento de seu aprendizado</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
      <Copyright />
    </AuthContextProvider>
  )
}

export default MyApp
