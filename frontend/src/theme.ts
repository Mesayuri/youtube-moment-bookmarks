import { createMuiTheme } from '@material-ui/core/styles';
import {
  grey, brown, orange, yellow, green, blue, purple, pink, red
} from '@material-ui/core/colors';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    [key: string]: any;
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    text: {
      primary: '#424242',
    },
    background: {
      default: '#fafafa',
    },
  },
});

export const tagShade = 100;

export const tagColors: { [key: string]: string; } = {
  'default': grey[100],
  'grey': grey[400],
  'brown': brown[tagShade],
  'orange': orange[tagShade],
  'yellow': yellow[tagShade],
  'green': green[tagShade],
  'blue': blue[tagShade],
  'purple': purple[tagShade],
  'pink': pink[tagShade],
  'red': red[tagShade],
};
