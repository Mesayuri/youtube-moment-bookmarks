import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// contexts
import { PlaylistContext } from '../../contexts/playlist';
import { TagContext } from '../../contexts/tag';
import { LoadContext } from '../../contexts/load';
// components
import FixedPlaylist from './FixedPlaylist';
import TagSelector from '../TagSelector';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    // marginTop: '20px',
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

  const {
    availableTags, selectedTagIdList, setSelectedTagIdList
  } = useContext(TagContext);
  const { playlist } = useContext(PlaylistContext);
  const { loadPlaylist } = useContext(LoadContext);

  return (
    <div className={classes.root}>
      <TagSelector
        tags={availableTags}
        selectedTagIdList={selectedTagIdList}
        setSelectedTagIdList={setSelectedTagIdList}
        onClose={() => loadPlaylist(selectedTagIdList)}
      />
      <Typography>
        {
          playlist.length > 0
          ? `${playingBookmarkIndex + 1} / ${playlist.length}`
          : '0 / 0'
        }
      </Typography>
      <FixedPlaylist
        playingBookmarkIndex={playingBookmarkIndex}
        setPlayingBookmarkIndex={setPlayingBookmarkIndex}
        enableAutoplay={enableAutoplay}
      />
    </div>
  );
};

export default PlaylistArea;
