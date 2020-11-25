import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
// theme
import { theme } from './theme';
// components
import Header from './components/Header/Header';
import PageContent from './components/PageContent/PageContent';
// API
import { Bookmark } from './api/bookmark';
import { Tag } from './api/tag';
// contexts
import { PlaylistContext } from './contexts/playlist';
import { AvailableTagsContext } from './contexts/availableTags';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<Bookmark[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AvailableTagsContext.Provider
          value={{ availableTags }}
        >
          <Header />
          <PlaylistContext.Provider
            value={{ playlist }}
          >
            <PageContent loading={loading}/>
          </PlaylistContext.Provider>
        </AvailableTagsContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
