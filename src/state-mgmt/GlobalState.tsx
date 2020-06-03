import React, { createContext, memo, PropsWithChildren, useReducer, Dispatch, useEffect } from 'react';

import { initialState as artistInitialState } from './artist/state';
import { reducer as artistReducer } from './artist/reducer';
import { IAction } from './types';
import { getDeps } from './dependencies';

export type IGlobalState = typeof initialState;

export const deps = getDeps<IGlobalState>();

export const initialState = {
  artist: artistInitialState
};

export function combineReducers<GS>(reducerMap: Record<string, (state: any, action: IAction) => any>) {
  return (gState: GS, gAction: IAction) => {
    const nextState = Object.entries(reducerMap).reduce(
      (total, [stateKey, reducer]) => ({ ...total, [stateKey]: reducer(gState[stateKey], gAction) }),
      {} as GS
    );
    const hasChanged = !!Array.from(new Set([...Object.keys(gState), ...Object.keys(nextState)])).find(key => gState[key] !== nextState[key]);
    return hasChanged ? nextState : gState;
  };
}

export const GlobalContext = createContext<{ state: IGlobalState; dispatch: Dispatch<any>; deps: typeof deps }>({
  state: initialState,
  dispatch: () => null,
  deps
});

export const GlobalProvider = memo(({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(
    combineReducers<IGlobalState>({ artist: artistReducer }),
    initialState
  );
  useEffect(() => deps.stateSnapshot.set(state), [state]);
  return <GlobalContext.Provider value={{ state, dispatch, deps }}>{children}</GlobalContext.Provider>;
});
