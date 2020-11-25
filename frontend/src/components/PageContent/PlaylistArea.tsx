import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
  },
}));

type Props = {
  playingBookmarkIndex: number,
};

const PlaylistArea: React.FC<Props> = ({ playingBookmarkIndex }) => {
  const classes = useStyles();

  return (
    <>
    </>
  );
};

export default PlaylistArea;
