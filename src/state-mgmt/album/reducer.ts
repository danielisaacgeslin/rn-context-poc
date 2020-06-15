import { ACTION_TYPE } from './actions';
import { IAlbumState, IAlbum } from './state';
import { IAction } from '../types';

export const reducer = (state: IAlbumState, action: IAction): IAlbumState => {
  switch (action.type) {
    case ACTION_TYPE.SEARCH_SUCCESS:
      return {
        ...state,
        albumMap: action.payload.list.reduce(
          (total: Record<string, Record<string, IAlbum>>, curr: IAlbum) => ({
            ...total,
            [curr.idArtist]: { ...(total[curr.idArtist] || {}), [curr.idAlbum]: curr }
          }),
          state.albumMap
        )
      };
    default:
      return state;
  }
};
