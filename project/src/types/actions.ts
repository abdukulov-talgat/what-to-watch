import { AuthInfo, Film } from './models';

export enum ActionType {
  SetAuthInfo = 'user/setAuthInfo',
  RemoveAuthInfo = 'user/removeAuthInfo',
  SetFilms = 'films/setFilms',
  SetPromoFilm = '/promo/setPromoFilm',
  SetManyFavoriteFilms = '/favorite/setManyFavoriteFilms',
  ChangeFavoriteFilmAction = '/favorite/changeFavoriteFilm',
}

export type SetAuthInfoAction = {
  type: ActionType.SetAuthInfo,
  payload: AuthInfo,
}

export type RemoveAuthInfoAction = {
  type: ActionType.RemoveAuthInfo,
}

export type SetFilmsAction = {
  type: ActionType.SetFilms,
  payload: Film[],
}

export type SetPromoFilmAction = {
  type: ActionType.SetPromoFilm,
  payload: Film,
}

export type AddManyFavoriteFilmsAction = {
  type: ActionType.SetManyFavoriteFilms,
  payload: Film[],
}

export type ChangeFavoriteFilmAction = {
  type: ActionType.ChangeFavoriteFilmAction,
  payload: Film,
}


export type Actions =
  | SetAuthInfoAction
  | RemoveAuthInfoAction
  | SetFilmsAction
  | SetPromoFilmAction
  | AddManyFavoriteFilmsAction
  | ChangeFavoriteFilmAction
