import { IAlbum } from './state';

export enum ACTION_TYPE {
  SEARCH_SUCCESS = '[album] search album success'
}

export const actions = {
  searchSuccess: (list: IAlbum[]) => ({ type: ACTION_TYPE.SEARCH_SUCCESS, payload: { list } })
};
