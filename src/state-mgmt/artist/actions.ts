import { IArtist } from './state';

export enum ACTION_TYPE {
  SEARCH_SUCCESS = '[artist] search artist success'
}

export const actions = {
  searchSuccess: (artist: IArtist) => ({ type: ACTION_TYPE.SEARCH_SUCCESS, payload: { artist } })
};
