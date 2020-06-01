import React, { createContext, memo, PropsWithChildren, useReducer, Dispatch, useCallback, useContext, useMemo } from 'react';

// https://www.theaudiodb.com/api/v1/json/1/search.php?s=bob%20dylan

export interface IArtist {
  idArtist: string;
  intBornYear: number;
  strArtist: string; // name
  strArtistThumb: string;
  strArtistBanner: string;
  strArtistFanart: string;
  strBiographyEN: string;
  strCountry: string;
  strStyle: string;
}

export interface IArtistState {
  artistMap: Record<string, IArtist>;
}

/** @todo move to a centraliced place */
export interface IAction<T = string, P = any> {
  type: T;
  payload: P;
}

export const initialState = {
  artistMap: {}
};

export const ArtistContext = createContext<{ state: IArtistState; dispatch: Dispatch<any> }>({
  state: initialState,
  dispatch: () => null
});

export enum ACTION_TYPE {
  SEARCH_SUCCESS = '[artist] search artist success'
}

export const actions = {
  searchSuccess: (artist: IArtist) => ({ type: ACTION_TYPE.SEARCH_SUCCESS, payload: { artist } })
};

export const useArtistEffect = () => {
  const { state, dispatch } = useContext(ArtistContext);
  const searchArtist = useCallback(
    async (search: string) => {
      const { artists } = await (await fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${search}`)).json();
      if (artists && artists.length) dispatch(actions.searchSuccess(artists[0]));
    },
    [state, dispatch]
  );
  return useMemo(() => ({ searchArtist }), [searchArtist]);
};

export const reducer = (state: IArtistState, action: IAction): IArtistState => {
  switch (action.type) {
    case ACTION_TYPE.SEARCH_SUCCESS:
      return { ...state, artistMap: { ...state.artistMap, [action.payload.artist.idArtist]: action.payload.artist } };
    default:
      return state;
  }
};

export const ArtistProvider = memo(({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <ArtistContext.Provider value={{ state, dispatch }}>{children}</ArtistContext.Provider>;
});
