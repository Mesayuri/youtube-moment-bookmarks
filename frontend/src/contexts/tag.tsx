import { createContext } from 'react';
import { Tag } from '../api/tag';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Props = {
  availableTags: Tag[],
  selectedTagIdList: number[],
  setSelectedTagIdList: SetState<number[]>
};

export const TagContext = createContext<Props>({
  availableTags: [],
  selectedTagIdList: [],
  setSelectedTagIdList: () => {console.log('init tag context')},
});
