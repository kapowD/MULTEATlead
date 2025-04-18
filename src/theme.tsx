import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#e7c428',
          borderWidth: '2px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#FFD700',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    body1: {
      marginBottom: '8px',
      fontFamily: '"Tahoma", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      color: '#1a1a1a',
      lineHeight: 1.5,
    },
  },
});

export default theme;


// add theme file as PrimeStyle