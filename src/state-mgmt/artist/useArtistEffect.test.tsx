import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useArtistEffect } from './useArtistEffect';
import { actions } from './actions';
import { GlobalProvider, initialState } from '../GlobalState';
import { getMockDeps, getArtist_1 } from '../../../test-helpers';

describe('useArtistEffect', () => {
  describe('searchArtist', () => {
    it('should fetch an artist', async () => {
      const deps = getMockDeps();
      deps.apiService.request = () => Promise.resolve({ json: () => Promise.resolve({ artists: [getArtist_1()] }) });
      const wrapper = ({ children }: any) => <GlobalProvider deps={deps}>{children}</GlobalProvider>;
      const { result } = renderHook(() => useArtistEffect(), { wrapper });
      let id: string;
      await act(async () => {
        id = await result.current.searchArtist(getArtist_1().strArtist);
      });

      expect(deps.stateSnapshot.set).toBeCalledTimes(2);
      expect(deps.stateSnapshot.set).toBeCalledWith({
        ...initialState,
        artist: { ...initialState.artist, artistMap: { [getArtist_1().idArtist]: getArtist_1() } }
      });
      expect(id).toEqual(getArtist_1().idArtist);
    });

    it('should NOT add to the store when no artist is found', async () => {
      const deps = getMockDeps();
      deps.apiService.request = () => Promise.resolve({ json: () => Promise.resolve({ artists: null }) });
      const wrapper = ({ children }: any) => <GlobalProvider deps={deps}>{children}</GlobalProvider>;
      const { result } = renderHook(() => useArtistEffect(), { wrapper });
      let id: string;
      await act(async () => {
        id = await result.current.searchArtist(getArtist_1().strArtist);
      });

      expect(id).toEqual(undefined);
      expect(deps.stateSnapshot.set).toBeCalledTimes(1);
    });
  });

  describe('searchArtist test example with mock reducer', () => {
    it('should fetch an artist', async () => {
      const deps = getMockDeps();
      const combinedReducer = jest.fn(s => s);
      deps.apiService.request = () => Promise.resolve({ json: () => Promise.resolve({ artists: [getArtist_1()] }) });
      const wrapper = ({ children }: any) => (
        <GlobalProvider deps={deps} combinedReducer={combinedReducer}>
          {children}
        </GlobalProvider>
      );
      const { result } = renderHook(() => useArtistEffect(), { wrapper });
      let id: string;
      await act(async () => {
        id = await result.current.searchArtist(getArtist_1().strArtist);
      });

      expect(combinedReducer).toBeCalledWith(initialState, actions.searchSuccess(getArtist_1()));
      expect(id).toEqual(getArtist_1().idArtist);
    });
  });
});
