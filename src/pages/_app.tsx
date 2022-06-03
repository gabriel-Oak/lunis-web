import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../utils/theme';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Head>
      <title>Lunis</title>
    </Head>

    <CssBaseline />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App
