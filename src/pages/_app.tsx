import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../utils/theme';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App
