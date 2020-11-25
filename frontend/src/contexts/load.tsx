import { createContext } from 'react';

type Props = {
  loadPlaylist: (tagIdList: number[]) => void,
  loadAvailableTags: () => void,
};

export const LoadContext = createContext<Props>({
  loadPlaylist: (tagIdList) => {console.log('LoadContext: initial loadPlaylist function')},
  loadAvailableTags: () => {console.log('LoadContext: initial loadAvailableTags function')},
});
