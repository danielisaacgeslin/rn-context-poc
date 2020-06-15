import React, { createContext, memo, PropsWithChildren, useReducer, Dispatch, useEffect } from 'react';

import { initialState as artistInitialState } from './artist/state';
import { reducer as artistReducer } from './artist/reducer';
import { initialState as albumInitialState } from './album/state';
import { reducer as albumReducer } from './album/reducer';
import { IAction, IGlobalState, Deps, IReducer } from './types';

export const initialState: IGlobalState = {
  artist: artistInitialState,
  album: albumInitialState
};

export function combineReducers<GS>(reducerMap: Record<string, (state: any, action: IAction) => any>): IReducer<GS> {
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

export const GlobalProvider = memo(
  ({
    children,
    deps,
    initState = initialState,
    combinedReducer = combineReducers<IGlobalState>({ artist: artistReducer, album: albumReducer })
  }: PropsWithChildren<{ deps: Deps; initState?: IGlobalState; combinedReducer?: IReducer<IGlobalState> }>) => {
    const [state, dispatch] = useReducer(combinedReducer, initState);
    useEffect(() => deps.stateSnapshot.set(state), [state]);
    return <GlobalContext.Provider value={{ state, dispatch, deps }}>{children}</GlobalContext.Provider>;
  }
);
