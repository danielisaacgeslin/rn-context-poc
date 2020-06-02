import { useContext, useCallback, useMemo } from 'react';

import { GlobalContext } from '../GlobalState';
import { actions } from './actions';

export const useArtistEffect = () => {
  const { state, dispatch, deps } = useContext(GlobalContext);
  const searchArtist = useCallback(
    async (search: string) => {
      const { artists } = await (await deps.apiService.request(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${search}`)).json();
      if (artists && artists.length) dispatch(actions.searchSuccess(artists[0]));
    },
    [state, dispatch]
  );
  return useMemo(() => ({ searchArtist }), [searchArtist]);
};
