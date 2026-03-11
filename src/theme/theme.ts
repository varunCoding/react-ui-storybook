import { createTheme } from '@mui/material/styles';

export const healthTheme = createTheme({
  palette: {
    primary: {
      main: '#005b9f', // Trustworthy health-blue
    },
    secondary: {
      main: '#2e7d32', // Health/Success green
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: '8px' },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Light blue for dark mode
    },
    secondary: {
      main: '#81c784', // Light green
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: '8px' },
      },
    },
  },
});