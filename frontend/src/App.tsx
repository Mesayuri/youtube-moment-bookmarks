import React, { useCallback, useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
// theme
import { theme } from './theme';
// components
import Header from './components/Header/Header';
import PageContent from './components/PageContent/PageContent';
// API
import { fetchBookmarks, Bookmark } from './api/bookmark';
import { fetchTagList, Tag } from './api/tag';
// contexts
import { PlaylistContext } from './contexts/playlist';
import { AvailableTagsContext } from './contexts/availableTags';
import { LoadContext } from './contexts/load';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<Bookmark[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  const loadPlaylist = useCallback(
    async (tagIdList: number[]) => {
      setLoading(true);

      const newPlaylist: Bookmark[] = await fetchBookmarks(tagIdList);
      setPlaylist(newPlaylist);

      setLoading(false);
    },
    [],
  );

  const loadAvailableTags = useCallback(
    async () => {
      setLoading(true);

      const newAvailableTags: Tag[] = await fetchTagList();
      setAvailableTags(newAvailableTags);

      setLoading(false);
    },
    [],
  );

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
          <LoadContext.Provider
            value={{ loadPlaylist, loadAvailableTags }}
          >
            <PageContent loading={loading}/>
          </LoadContext.Provider>
          </PlaylistContext.Provider>
        </AvailableTagsContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
