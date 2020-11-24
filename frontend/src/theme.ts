import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    [key: string]: any;
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff6633',
    },
    secondary: {
      main: '#556cd6',
    },
    text: {
      primary: '#424242',
    },
    background: {
      default: '#fafafa',
    },
  },
});
