export interface IArtist {
  idArtist: string;
  intBornYear: number;
  strArtist: string; // name
  strArtistThumb: string;
  strArtistBanner: string;
  strArtistFanart: string;
  strBiographyEN: string;
  strCountry: string;
  strStyle: string;
}

export interface IArtistState {
  artistMap: Record<string, IArtist>;
}

export const initialState: IArtistState = {
  artistMap: {}
};
