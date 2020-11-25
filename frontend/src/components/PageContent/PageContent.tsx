import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CircularProgress, Divider } from '@material-ui/core';
// components
import EmbeddedVideo from './EmbeddedVideo';
import PlaylistArea from './PlaylistArea';

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

  const [playingBookmarkIndex, setPlayingBookmarkIndex] = useState(0);
  const [autoplay, setAutoplay] = useState<0 | 1>(0);
  // const [listItemDetail, setListItemDetail] = useState();

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
              setPlayingBookmarkIndex={setPlayingBookmarkIndex}
              enableAutoplay={() => setAutoplay(1)}
            />
          </>
        )
      }
    </div>
  );
};

export default PageContent;
