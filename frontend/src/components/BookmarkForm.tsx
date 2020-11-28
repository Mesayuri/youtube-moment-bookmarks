import React, { useState, useContext, useCallback } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  TextField, Button, Dialog, Typography
} from '@material-ui/core';
// utils
import {
  validateTimeFormat, convertStr2Time, convertTime2Str, validateVideoIdFormat,
  trimVideoId
} from '../utils';
// API
import {
  Bookmark, NewBookmark,
  sendNewBookmark, sendBookmarkUpdate, sendBookmarkDelete
} from '../api/bookmark';
// contexts
import { TagContext } from '../contexts/tag';
import { LoadContext } from '../contexts/load';
import { AlertContext, AlertType } from '../contexts/alert';
// components
import TagSelector from './TagSelector';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '20px 20px',
  },
  textFiled: {
    // margin: '0 10px',
    margin: theme.spacing(1),
  },
  commentFiled: {
    marginTop: theme.spacing(1),
  },
  tagSelection: {
    margin: theme.spacing(1),
  },
  addButton: {
    margin: theme.spacing(2),
  },
  deleteButton: {
    margin: theme.spacing(2),
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },
  deleteDialog: {
    padding: '30px 30px',
  },
  deleteDialogButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  bookmark: Bookmark | undefined,
};

const BookmarkForm: React.FC<Props> = ({ bookmark }) => {
  const classes = useStyles();

  const { availableTags, selectedTagIdList } = useContext(TagContext);
  const { setAlertInfo } = useContext(AlertContext);
  const { loadPlaylist } = useContext(LoadContext);

  const [videoId, setVideoId] = useState(
    bookmark === undefined ? '' : bookmark.videoId
  );
  const [startTime, setStartTime] = useState(
    bookmark === undefined ? '' : convertTime2Str(bookmark.startTime)
  );
  const [endTime, setEndTime] = useState(
    bookmark === undefined ? '' : convertTime2Str(bookmark.endTime)
  );
  const [title, setTitle] = useState(
    bookmark === undefined ? '' : bookmark.title
  );
  const [notes, setNotes] = useState(
    bookmark === undefined ? '' : bookmark.notes
  );
  const [tagIdList, setTagIdList] = useState<number[]>(
    bookmark === undefined ? [] : bookmark.tagIdList
  );
  const [videoIdIsValid, setVideoIdIsValid] = useState(true);
  const [startTimeIsValid, setStartTimeIsValid] = useState(true);
  const [endTimeIsValid, setEndTimeIsValid] = useState(true);
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const clearFields = () => {
    setStartTime('');
    setEndTime('');
    setTitle('');
    setNotes('');
  };

  const validate = useCallback(
    () => {
      const newVideoIdIsValid = validateVideoIdFormat(videoId);
      const newStartTimeIsValid = validateTimeFormat(startTime);
      const newEndTimeIsValid = endTime === '' || validateTimeFormat(endTime);
      const newTitleIsValid = title !== '' && title.length < 140;
      setVideoIdIsValid(newVideoIdIsValid);
      setStartTimeIsValid(newStartTimeIsValid);
      setEndTimeIsValid(newEndTimeIsValid);
      setTitleIsValid(newTitleIsValid);

      const isValid = (
        newVideoIdIsValid
        && newStartTimeIsValid
        && newEndTimeIsValid
        && newTitleIsValid
        && tagIdList.length > 0
      );
      return isValid;
    },
    [videoId, startTime, endTime, title, tagIdList],
  );

  const handleClickNew = useCallback(
    async () => {
      if (validate()) {
        const newStartTime = convertStr2Time(startTime);
        const newBookmark: NewBookmark = {
          videoId: trimVideoId(videoId),
          startTime: newStartTime,
          endTime: endTime === '' ? newStartTime + 15 : convertStr2Time(endTime),
          title,
          notes,
          tagIdList
        };
        const sendResult: boolean = await sendNewBookmark(newBookmark);
        
        switch (sendResult) {
          case true:
            loadPlaylist(selectedTagIdList);
            setAlertInfo({
              open: true,
              type: AlertType.Success,
              message: `Bookmark "${title}" is saved`
            });
            clearFields();
            break;
          case false:
            setAlertInfo({
              open: true,
              type: AlertType.Error,
              message: `Bookmark "${title}" is failed to save`
            });
            break;
          default:
            setAlertInfo({
              open: true,
              type: AlertType.Warning,
              message: 'System Message: Unexpected open'
            });
            break;
        }
      }
    },
    [
      notes, endTime, loadPlaylist, selectedTagIdList, setAlertInfo,
      startTime, tagIdList, title, validate, videoId
    ],
  );

  const handleClickEdit = useCallback(
    async () => {
      if (validate() && bookmark !== undefined) {
        const editedBookmark: Bookmark = {
          id: bookmark.id,
          videoId,
          startTime: convertStr2Time(startTime),
          endTime: convertStr2Time(endTime),
          title,
          notes,
          tagIdList
        };
        const sendResult: boolean = await sendBookmarkUpdate(editedBookmark);
        
        switch (sendResult) {
          case true:
            loadPlaylist(selectedTagIdList);
            setAlertInfo({
              open: true,
              type: AlertType.Success,
              message: `Bookmark "${title}" is saved`
            });
            break;
          case false:
            setAlertInfo({
              open: true,
              type: AlertType.Error,
              message: `Bookmark "${title}" is failed to save`
            });
            break;
          default:
            setAlertInfo({
              open: true,
              type: AlertType.Warning,
              message: 'System Message: Unexpected open'
            });
            break;
        }
      }
    },
    [
      validate, bookmark, videoId, startTime, endTime, title, notes,
      tagIdList, loadPlaylist, selectedTagIdList, setAlertInfo
    ],
  );

  const handleClickDelete = useCallback(
    async () => {
      if (bookmark === undefined) {
        return;
      }

      const editedBookmark: Bookmark = {
        id: bookmark.id,
        videoId,
        startTime: convertStr2Time(startTime),
        endTime: convertStr2Time(endTime),
        title,
        notes,
        tagIdList
      };
      const sendResult: boolean = await sendBookmarkDelete(editedBookmark);
      
      switch (sendResult) {
        case true:
          loadPlaylist(selectedTagIdList);
          setAlertInfo({
            open: true,
            type: AlertType.Success,
            message: `Bookmark "${title}" is deleted`
          });
          break;
        case false:
          setAlertInfo({
            open: true,
            type: AlertType.Error,
            message: `Bookmark "${title}" is failed to delete`
          });
          break;
        default:
          setAlertInfo({
            open: true,
            type: AlertType.Warning,
            message: 'System Message: Unexpected open'
          });
          break;
      }
    },
    [
      bookmark, endTime, loadPlaylist, notes, selectedTagIdList, setAlertInfo,
      startTime, tagIdList, title, videoId
    ],
  );

  return (
    <div className={classes.root}>
      <TextField
        className={classes.textFiled}
        id='title'
        label='Bookmark Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        error={!titleIsValid}
        fullWidth
      />
      <TextField
        className={classes.textFiled}
        id='videoId'
        label='Video ID / URL'
        value={videoId}
        onChange={e => setVideoId(e.target.value)}
        error={!videoIdIsValid}
        fullWidth
      />
      <div>
        <TextField
          className={classes.textFiled}
          id='startTime'
          label='Start Time'
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          error={!startTimeIsValid}
        />
        <TextField
          className={classes.textFiled}
          id='endTime'
          label='End Time'
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
          error={!endTimeIsValid}
        />
      </div>
      <TagSelector
        tags={availableTags}
        selectedTagIdList={tagIdList}
        setSelectedTagIdList={setTagIdList}
        onClose={() => {}}
      />
      <div>
        <TextField
          className={classes.commentFiled}
          id='notes'
          label='Notes'
          value={notes}
          onChange={e => setNotes(e.target.value)}
          multiline
          fullWidth
          rows={4}
          variant='outlined'
          // helperText='max 140'
        />
      </div>
      <Button
        className={classes.addButton}
        id='saveButton'
        variant='outlined'
        color='primary'
        onClick={bookmark === undefined ? handleClickNew : handleClickEdit}
      >
        Save
      </Button>
      {
        bookmark !== undefined
        ? (
          <>
            <Button
              className={classes.deleteButton}
              id='ask-delete-button'
              variant='outlined'
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </Button>
            <Dialog
              id='delete-dialog'
              open={deleteDialogOpen}
              onClose={() => setDeleteDialogOpen(false)}
            >
              <div className={classes.deleteDialog}>
                <Typography>Are you sure you want to delete?</Typography>
                <Button
                  className={classes.deleteDialogButton}
                  id='delete-button'
                  color='primary'
                  variant='outlined'
                  onClick={handleClickDelete}
                >
                  Ok
                </Button>
                <Button
                  className={classes.deleteDialogButton}
                  variant='outlined'
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </Dialog>
          </>
        )
        : null
      }
    </div>
  );
};

export default BookmarkForm;
