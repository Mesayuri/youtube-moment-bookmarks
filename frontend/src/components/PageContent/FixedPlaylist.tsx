import React, { useContext, useRef, useEffect, useCallback, memo } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  ListItem, Typography, CardMedia, ListItemText, Link, Chip
} from '@material-ui/core';
import { FixedSizeList, areEqual, ListChildComponentProps } from 'react-window';
// types
import { Bookmark } from '../../api/bookmark';
// contexts
import { PlaylistContext } from '../../contexts/playlist';
import { TagContext } from '../../contexts/tag';
// utils
import { convertTime2Str, filterTags } from '../../utils';
// themes
import { tagColors } from '../../theme';

const thumbnailWidth = 6;
const listItemRatio = 0.5;
const thumbnailUrl = 'https://img.youtube.com/vi';

const useStyles = makeStyles((theme: Theme) => createStyles({
  thumbnail: {
    width: `${16 * thumbnailWidth}px`,
    height: `${9 * thumbnailWidth}px`,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  listItem: {
    width: `${listItemRatio * 100}%`,
  },
  tagChip: {
    margin: 2,
  },
}));

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Props = {
  playingBookmarkIndex: number,
  setPlayingBookmarkIndex: SetState<number>,
  enableAutoplay: () => void,
};

const FixedPlaylist: React.FC<Props> = ({
  playingBookmarkIndex ,setPlayingBookmarkIndex, enableAutoplay
  }) => {
  const classes = useStyles();

  const { playlist } = useContext(PlaylistContext);
  const { availableTags } = useContext(TagContext);

  const handleClickItem = useCallback(
    (index: number) => {
      setPlayingBookmarkIndex(index);
      enableAutoplay();
    },
    [setPlayingBookmarkIndex, enableAutoplay],
  );

  const listRef = useRef<any>();
  useEffect(
    () => {
      listRef.current!.scrollToItem(playingBookmarkIndex);
    },
    [playingBookmarkIndex],
  )

  const renderListItem = memo(
    (props: ListChildComponentProps) => {
      const { index, style, data } = props;
      const bookmark: Bookmark = data[index];
    
      return (
        <ListItem
          button
          key={bookmark.id}
          ContainerProps={{ style }}
          ContainerComponent='div'
          onClick={() => handleClickItem(index)}
          selected={playingBookmarkIndex === index}
        >
          <Typography
            variant='caption'
            color='textSecondary'
          >
            {index + 1}
          </Typography>
          <CardMedia
            className={classes.thumbnail}
            component='img'
            image={`${thumbnailUrl}/${bookmark.videoId}/mqdefault.jpg`}
          />
          <ListItemText
            key={bookmark.id}
            primary={
              <div>
                <Link>
                  {convertTime2Str(bookmark.startTime)}
                  {' ~ '}
                  {convertTime2Str(bookmark.endTime)}
                </Link>
                {' ' + bookmark.title}
              </div>
            }
            secondary={
              filterTags(availableTags, bookmark.tagIdList).map(
                tag => (
                  <Chip
                    className={classes.tagChip}
                    label={tag.tagName}
                    style={{ backgroundColor: tagColors[tag.color] }}
                    size='small'
                  />
                )
              )
            }
          />
        </ListItem>
      );
    },
    areEqual,
  );

  return (
      <FixedSizeList
        height={400}
        width={'100%'}
        itemSize={thumbnailWidth * 13}
        itemCount={playlist.length}
        itemData={playlist}
        ref={list => {
          listRef.current = list;
        }}
      >
        {renderListItem}
      </FixedSizeList>
  );
};

export default FixedPlaylist;
