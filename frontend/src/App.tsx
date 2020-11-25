import React, { useCallback, useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
// theme
import { theme } from './theme';
// components
import Header from './components/Header/Header';
import PageContent from './components/PageContent/PageContent';
import SnackBars from './components/SnackBars';
// API
import { fetchBookmarks, Bookmark } from './api/bookmark';
import { fetchTagList, Tag } from './api/tag';
// contexts
import { PlaylistContext } from './contexts/playlist';
import { TagContext } from './contexts/tag';
import { LoadContext } from './contexts/load';
import { AlertContext, AlertInfo, AlertType } from './contexts/alert';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<Bookmark[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTagIdList, setSelectedTagIdList] = useState<number[]>([]);
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    open: false,
    type: AlertType.Warning,
    message: 'This is an initial message.'
  });

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

  useEffect(
    () => {
      const initTagIdList: number[] = [];
      loadPlaylist(initTagIdList);
      loadAvailableTags();
      setSelectedTagIdList(initTagIdList);
    },
    [loadAvailableTags, loadPlaylist],
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TagContext.Provider
          value={{ availableTags, selectedTagIdList, setSelectedTagIdList }}
        >
        <AlertContext.Provider
          value={{ alertInfo, setAlertInfo }}
        >
        <LoadContext.Provider
          value={{ loadPlaylist, loadAvailableTags }}
        >
          <Header />
          <PlaylistContext.Provider
            value={{ playlist }}
          >
            <PageContent loading={loading}/>
          </PlaylistContext.Provider>
          </LoadContext.Provider>
          <SnackBars />
        </AlertContext.Provider>
        </TagContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
