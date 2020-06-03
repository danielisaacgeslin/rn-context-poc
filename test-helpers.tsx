import { Dispatch, createContext } from 'react';

import { initialState as artistInitialState, IArtist } from './src/state-mgmt/artist/state';
import { IGlobalState, Deps } from './src/state-mgmt/types';

export const getMockDeps = (): Deps =>
  ({
    apiService: { request: jest.fn().mockResolvedValue({ json: () => ({}) }) },
    stateSnapshot: { set: jest.fn(), get: jest.fn().mockReturnValue({}) }
  } as any);

export const MockGlobalContext = createContext<{ state: IGlobalState; dispatch: Dispatch<any>; deps: Deps }>({
  state: { artist: artistInitialState },
  dispatch: () => null,
  deps: getMockDeps()
});

export const getArtist_1 = (): IArtist => ({
  idArtist: '1',
  intBornYear: 1970,
  strArtist: 'Freddie Mercuty',
  strArtistThumb: 'thumb.png',
  strArtistBanner: 'banner.png',
  strArtistFanart: 'fanart.png',
  strBiographyEN: 'this is a bio',
  strCountry: 'USA',
  strStyle: 'rock'
});
