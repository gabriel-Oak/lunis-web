import { createTheme } from '@mui/material';
import { ptBR } from '@mui/material/locale';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#18003c',
      main: '#230057',
      light: '#4f3378',
    },
    secondary: {
      dark: '#003c6c',
      main: '#01579b',
      light: '#3378af',
    },
    background: {
      default: '#666666',
    },
  },
}, ptBR);

export default theme;