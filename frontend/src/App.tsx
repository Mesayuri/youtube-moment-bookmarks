import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
// theme
import { theme } from './theme';
// components
import Header from './components/Header/Header';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
      </ThemeProvider>
    </>
  );
};

export default App;
