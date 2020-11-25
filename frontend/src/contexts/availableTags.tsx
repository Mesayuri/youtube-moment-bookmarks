import { createContext } from 'react';
import { Tag } from '../api/tag';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Props = {
  availableTags: Tag[],
};

export const AvailableTagsContext = createContext<Props>({
  availableTags: [],
});
