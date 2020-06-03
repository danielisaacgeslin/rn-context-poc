import { Deps, IGlobalState } from './types';

export const getDeps = (): Deps => ({
  apiService: { request: fetch },
  stateSnapshot: (() => {
    let state: IGlobalState;
    return {
      set: (s: IGlobalState) => {
        state = s;
      },
      get: () => state
    };
  })()
});
