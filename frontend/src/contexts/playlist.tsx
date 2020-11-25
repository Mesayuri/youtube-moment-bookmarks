import { createContext } from 'react';
import { Bookmark } from '../api/bookmark';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Props = {
  playlist: Bookmark[],
};

export const PlaylistContext = createContext<Props>({
  playlist: [],
});
