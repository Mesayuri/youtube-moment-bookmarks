import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FormGroup, Typography } from '@material-ui/core';
// contexts
// import { PlaylistContext } from '../../contexts/playlist';
// components
import FixedPlaylist from './FixedPlaylist';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginTop: '20px',
    marginBottom: '40px',
  },
}));

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Props = {
  playingBookmarkIndex: number,
  setPlayingBookmarkIndex: SetState<number>,
  enableAutoplay: () => void,
};

const PlaylistArea: React.FC<Props> = ({
  playingBookmarkIndex, setPlayingBookmarkIndex, enableAutoplay
}) => {
  const classes = useStyles();

  // const { playlist } = useContext(PlaylistContext);

  return (
    <div className={classes.root}>
      <FixedPlaylist
        playingBookmarkIndex={playingBookmarkIndex}
        setPlayingBookmarkIndex={setPlayingBookmarkIndex}
        enableAutoplay={enableAutoplay}
      />
    </div>
  );
};

export default PlaylistArea;
