export interface IAlbum {
  idAlbum: string;
  idArtist: string;
  strAlbum: string;
  intYearReleased: string;
  strDescriptionEN: string;
}

export interface IAlbumState {
  albumMap: { [idArtist: string]: { [idAlbum: string]: IAlbum } };
}

export const initialState: IAlbumState = {
  albumMap: {}
};
