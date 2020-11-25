import React, { useContext, useCallback } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import YouTube from 'react-youtube';
// contexts
import { PlaylistContext } from '../../contexts/playlist';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

type Props = {
  playingBookmarkIndex: number,
  setNextPlayingIndex: () => void,
  autoplay: 0 | 1,
  enableAutoplay: () => void,
};

const EmbeddedVideo: React.FC<Props> = ({
  playingBookmarkIndex, setNextPlayingIndex, autoplay, enableAutoplay
}) => {
  const classes = useStyles();

  const { playlist } = useContext(PlaylistContext);

  const onEnd = useCallback(
    () => {
      if (playingBookmarkIndex + 1 < playlist.length) {
        setNextPlayingIndex();
        enableAutoplay();
      }
    },
    [enableAutoplay, playingBookmarkIndex, playlist.length, setNextPlayingIndex],
  );

  const rel: 0 | 1 | undefined = 0;

  return (
    <div className={classes.root}>
      {
        playlist.length > 0
        ? <YouTube
          className={classes.iframe}
          id='embedded-YouTube'
          videoId={playlist[playingBookmarkIndex].videoId}
          opts={{
            playerVars: {
              autoplay: autoplay,
              start: playlist[playingBookmarkIndex].startTime,
              end: playlist[playingBookmarkIndex].endTime,
              rel: rel,
              // width: 560,
              // height: 315,
            },
          }}
          onEnd={onEnd}
        />
        : <Typography variant='h6'>There is no bookmarks.</Typography>
      }
    </div>
  );
};

export default EmbeddedVideo;
