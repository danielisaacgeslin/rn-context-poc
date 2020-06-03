import { IArtistState } from './artist/state';

export interface IAction<T = string, P = any> {
  type: T;
  payload: P;
}

export type IGlobalState = {
  artist: IArtistState;
};

export interface Deps {
  apiService: { request: Function };
  stateSnapshot: { get: () => IGlobalState; set: (state: IGlobalState) => void };
}
