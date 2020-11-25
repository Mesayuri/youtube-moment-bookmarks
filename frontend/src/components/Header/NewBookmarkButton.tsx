import React, { useState, useCallback } from 'react';
import { Button, Popover } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// components
import BookmarkForm from '../BookmarkForm';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
  },
  tagIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

type AnchorEl = HTMLButtonElement | null;

const NewBookmarkButton: React.FC = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<AnchorEl>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(
    () => {
      setAnchorEl(null);
    },
    [],
  );

  const open = Boolean(anchorEl);
  const id = open ? 'new-tag-popover' : undefined;

  return (
    <div className={classes.root}>
      <Button
        color="inherit"
        aria-describedby={id}
        onClick={handleClick}
      >
        <AddIcon fontSize="small" color="inherit" />
          New Bookmark
        <BookmarkBorderIcon className={classes.tagIcon} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <BookmarkForm bookmark={undefined} />
      </Popover>
    </div>
  );
};

export default NewBookmarkButton;
