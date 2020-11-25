import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CircularProgress, Divider } from '@material-ui/core';
// components
import EmbeddedVideo from './EmbeddedVideo';
import PlaylistArea from './PlaylistArea';
// contexts
import { LoadContext } from '../../contexts/load';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '0 38px',
  },
}));

type Props = {
  loading: boolean,
};

const PageContent: React.FC<Props> = ({ loading }) => {
  const classes = useStyles();

  const { loadPlaylist, loadAvailableTags} = useContext(LoadContext);

  const [playingBookmarkIndex, setPlayingBookmarkIndex] = useState(0);
  const [autoplay, setAutoplay] = useState<0 | 1>(0);
  const [selectedTagId, setSelectedTagId] = useState<number[]>([]);
  // const [listItemDetail, setListItemDetail] = useState();

  useEffect(
    () => {
      const initTagIdList: number[] = [];
      loadPlaylist(initTagIdList);
      loadAvailableTags();
      setSelectedTagId(initTagIdList);
    },
    [loadAvailableTags, loadPlaylist],
  );

  return (
    <div className={classes.root}>
      {
        loading
        ? <CircularProgress />
        : (
          <>
            <EmbeddedVideo
              playingBookmarkIndex={playingBookmarkIndex}
              setNextPlayingIndex={() => setPlayingBookmarkIndex(
                playingBookmarkIndex + 1
              )}
              autoplay={autoplay}
              enableAutoplay={() => setAutoplay(1)}
            />
            <Divider />
            <PlaylistArea 
              playingBookmarkIndex={playingBookmarkIndex}
            />
          </>
        )
      }
    </div>
  );
};

export default PageContent;
