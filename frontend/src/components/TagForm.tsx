import React, { useState, useCallback, useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  TextField, Button, Select, InputLabel, MenuItem
} from '@material-ui/core';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
// styles
// themes
import { tagColors } from '../theme';
// API
import { Tag, NewTag, sendNewTag, sendTagUpdate } from '../api/tag';
// contexts
import { LoadContext } from '../contexts/load';
import { AlertContext, AlertType } from '../contexts/alert';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '20px 20px',
  },
  textFiled: {
    // margin: '0 10px',
    margin: theme.spacing(1),
  },
  colorSelection: {
    margin: theme.spacing(1),
  },
  addButton: {
    margin: theme.spacing(2),
  },
}));

type Props = {
  tag: Tag | undefined,
};

const TagForm: React.FC<Props> = ({tag}) => {
  const classes = useStyles();

  const { setAlertInfo } = useContext(AlertContext);
  const { loadAvailableTags } = useContext(LoadContext);
  const [tagName, setTagName] = useState(
    tag === undefined ? '' : tag.tagName
  );
  const [tagNameIsValid, setTagNameIsValid] = useState(true);
  const [tagColor, setTagColor] = useState(
    tag === undefined ? 'default' : tag.color);

  const clearFields = () => {
    setTagName('');
    setTagColor('default');
  };

  const validate = useCallback(
    () => {
      const newTagNameIsValid = tagName !== '';
      setTagNameIsValid(newTagNameIsValid);

      const isValid = newTagNameIsValid;
      return isValid;
    },
    [tagName],
  );

  const handleClickNew = useCallback(
    async () => {
      if (validate()) {
        const newTag: NewTag = {
          tagName,
          color: tagColor,
        };
        const sendResult: boolean = await sendNewTag(newTag);

        switch (sendResult) {
          case true:
            loadAvailableTags();
            setAlertInfo({
              open: true,
              type: AlertType.Success,
              message: `Tag "${tagName}" is saved`
            });
            clearFields();
            break;
          case false:
            setAlertInfo({
              open: true,
              type: AlertType.Error,
              message: `Tag "${tagName}" is failed to save`
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
    [loadAvailableTags, setAlertInfo, tagColor, tagName, validate],
  );

  const handleClickEdit = useCallback(
    async () => {
      if (validate() && tag !== undefined) {
        const editedTag: Tag = {
          id: tag.id,
          tagName,
          color: tagColor,
        };
        const sendResult: boolean = await sendTagUpdate(editedTag);

        switch (sendResult) {
          case true:
            loadAvailableTags();
            setAlertInfo({
              open: true,
              type: AlertType.Success,
              message: `Tag "${tagName}" is saved`
            });
            break;
          case false:
            setAlertInfo({
              open: true,
              type: AlertType.Error,
              message: `Tag "${tagName}" is failed to save`
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
    [validate, tag, tagName, tagColor, loadAvailableTags, setAlertInfo],
  );

  return (
    <div className={classes.root}>
      <InputLabel id='newTagColorLabel'>Color</InputLabel>
      <Select
        className={classes.colorSelection}
        id='newTagColor'
        labelId='newTagColorLabel'
        value={tagColor}
        onChange={e => setTagColor(e.target.value as string)}
      >
        {Object.keys(tagColors).map((colorKey) => (
          <MenuItem key={colorKey} value={colorKey}>
            <PaletteOutlinedIcon
              style={{ background: tagColors[colorKey] }}
              fontSize='large'
            />
          </MenuItem>
        ))}

      </Select>
      <TextField
        className={classes.textFiled}
        id='tagName'
        label='Tag Name'
        value={tagName}
        onChange={e => setTagName(e.target.value)}
        error={!tagNameIsValid}
      />
      <Button
        className={classes.addButton}
        variant='outlined'
        color='primary'
        onClick={tag === undefined ? handleClickNew : handleClickEdit}
      >Save</Button>
    </div>
  );
};

export default TagForm;
