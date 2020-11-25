import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CircularProgress, Divider } from '@material-ui/core';

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
  const [selectedTagId, setSelectedTagId] = useState<number[]>([]);
  // const [listItemDetail, setListItemDetail] = useState();

  return (
    <div className={classes.root}>
      {
        loading
        ? <CircularProgress />
        : (
          <>
            <EmbeddedVideo />
            <Divider />
            <PlayList />
          </>
        )
      }
    </div>
  );
};

export default PageContent;
