import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  InputLabel, Select, MenuItem, Chip, Input,
  ListItemSecondaryAction, IconButton, Checkbox,
  Dialog, FormControl
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
// utils
import { filterTags } from '../utils';
// types
import { Tag } from '../api/tag';
// themes
import { tagColors } from '../theme';
// components
import TagForm from './TagForm';

const useStyles = makeStyles((theme: Theme) => createStyles({
  tagSelection: {
    margin: theme.spacing(1),
    minWidth: '200px',
  },
  tagChips: {
    minWidth: '200px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  tagChip: {
    margin: 2,
  },
}));

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Props = {
  tags: Tag[],
  selectedTagIdList: number[],
  setSelectedTagIdList: SetState<number[]>,
  onClose: () => void,
};

const TagSelector: React.FC<Props> = ({
  tags,
  selectedTagIdList,
  setSelectedTagIdList,
  onClose,
}) => {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | undefined>();

  return (
      <>
      <FormControl className={classes.tagSelection}>
        <InputLabel id='filterTagIdListLabel'>Tags</InputLabel>
        <Select
          id='filterTags'
          labelId='filterTagIdListLabel'
          multiple
          value={selectedTagIdList}
          onChange={e => setSelectedTagIdList(e.target.value as number[])}
          onClose={onClose}
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.tagChips}>
              {
                filterTags(
                  tags, (selected as number[])
                ).map((selectedTag) => (
                  <Chip
                    key={selectedTag.id}
                    label={selectedTag.tagName}
                    className={classes.tagChip}
                    size='small'
                    style={{ backgroundColor: tagColors[selectedTag.color] }}
                  />
                ))
              }
            </div>
          )}
        >
          {tags.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              <Checkbox
                checked={selectedTagIdList.indexOf(tag.id) > -1}
                size='small'
              />
              <Chip
                key={tag.id}
                label={tag.tagName}
                className={classes.tagChip}
                size='small'
                style={{ backgroundColor: tagColors[tag.color] }}
              />
              <ListItemSecondaryAction
                key={tag.id}
                onClick={() => {
                  setEditingTag(tag);
                  setDialogOpen(true);
                }}
              >
                <IconButton edge='end' aria-label='edit'>
                  <EditIcon fontSize='small'/>
                </IconButton>
              </ListItemSecondaryAction>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <Dialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setEditingTag(undefined);
          }}
        >
          <TagForm tag={editingTag}/>
        </Dialog>
      </>
  );
};

export default TagSelector;
