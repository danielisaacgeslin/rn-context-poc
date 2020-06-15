import { useContext, useCallback, useMemo } from 'react';

import { GlobalContext } from '../GlobalState';
import { useAlbumEffect } from '../album/useAlbumEffect';
import { actions } from './actions';
import { IArtist } from './state';

export const useArtistEffect = () => {
  const { dispatch, deps } = useContext(GlobalContext);
  const { searchAlbumList } = useAlbumEffect();
  const searchArtist = useCallback(
    async (search: string) => {
      // deps.stateSnapshot.get().artist.artistMap // to get a snapshot of the current state
      const { artists } = await (await deps.apiService.request(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${search}`)).json();
      const [artist] = (artists || []) as IArtist[];
      if (artist) {
        dispatch(actions.searchSuccess(artist));
        searchAlbumList(artist.idArtist);
      }
      return artist?.idArtist;
    },
    [dispatch]
  );
  return useMemo(() => ({ searchArtist }), [searchArtist]);
};
