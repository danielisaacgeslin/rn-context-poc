import { ACTION_TYPE } from './actions';
import { IArtistState } from './state';
import { IAction } from '../types';

export const reducer = (state: IArtistState, action: IAction): IArtistState => {
  switch (action.type) {
    case ACTION_TYPE.SEARCH_SUCCESS:
      return { ...state, artistMap: { ...state.artistMap, [action.payload.artist.idArtist]: action.payload.artist } };
    default:
      return state;
  }
};
