import React, { createContext, memo, PropsWithChildren, useReducer, Dispatch, useEffect } from 'react';

import { initialState as artistInitialState } from './artist/state';
import { reducer as artistReducer } from './artist/reducer';
import { IAction, IGlobalState, Deps } from './types';

export const initialState: IGlobalState = {
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

export const GlobalContext = createContext<{ state: IGlobalState; dispatch: Dispatch<any>; deps: Deps }>({
  state: initialState,
  dispatch: () => null,
  deps: null
});

export const GlobalProvider = memo(({ children, deps, initState = initialState }: PropsWithChildren<{ deps: Deps; initState?: IGlobalState }>) => {
  const [state, dispatch] = useReducer(
    combineReducers<IGlobalState>({ artist: artistReducer }),
    initState
  );
  useEffect(() => deps.stateSnapshot.set(state), [state]);
  return <GlobalContext.Provider value={{ state, dispatch, deps }}>{children}</GlobalContext.Provider>;
});
