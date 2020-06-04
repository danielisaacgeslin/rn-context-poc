import { IArtist } from './src/state-mgmt/artist/state';
import { Deps } from './src/state-mgmt/types';

export const getMockDeps = (): Deps =>
  ({
    apiService: { request: jest.fn().mockResolvedValue({ json: () => ({}) }) },
    stateSnapshot: { set: jest.fn(), get: jest.fn().mockReturnValue({}) }
  } as any);

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
