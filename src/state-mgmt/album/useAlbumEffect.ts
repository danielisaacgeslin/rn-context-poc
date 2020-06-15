import { useContext, useCallback, useMemo } from 'react';

import { GlobalContext } from '../GlobalState';
import { actions } from './actions';
import { IAlbum } from './state';

export const useAlbumEffect = () => {
  const { dispatch, deps } = useContext(GlobalContext);
  const searchAlbumList = useCallback(
    async (idArtist: string) => {
      const { album: albumList }: { album: IAlbum[] } = await (
        await deps.apiService.request(`https://theaudiodb.com/api/v1/json/1/album.php?i=${idArtist}`)
      ).json();
      if (albumList) dispatch(actions.searchSuccess(albumList));
      return idArtist;
    },
    [dispatch]
  );
  return useMemo(() => ({ searchAlbumList }), [searchAlbumList]);
};
