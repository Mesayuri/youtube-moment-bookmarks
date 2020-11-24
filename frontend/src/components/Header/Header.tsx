import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// components
import NewTagButton from './NewTagButton';
import NewBookmarkButton from './NewBookmarkButton';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    marginTop: '90px',
  },
  title: {
    flexGrow: 1,
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color='default'>
        <Toolbar>
          <Typography className={classes.title} variant='h6'>
            YouTube Moment Bookmarks
          </Typography>
          <NewTagButton />
          <NewBookmarkButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
