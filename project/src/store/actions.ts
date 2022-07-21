import { AuthInfo, Film, } from '../types/models';
import {
  ActionType,
  AddManyFavoriteFilmsAction,
  ChangeFavoriteFilmAction,
  RemoveAuthInfoAction,
  SetAuthInfoAction,
  SetFilmsAction,
  SetPromoFilmAction
} from '../types/actions';


export function setAuthInfoAction(payload: AuthInfo): SetAuthInfoAction {
  return {
    type: ActionType.SetAuthInfo,
    payload: payload
  };
}

export function removeAuthInfoAction(): RemoveAuthInfoAction {
  return {
    type: ActionType.RemoveAuthInfo
  };
}

export function setFilms(films: Film[]): SetFilmsAction {
  return {
    type: ActionType.SetFilms,
    payload: films,
  };
}

export function setPromoFilm(film: Film): SetPromoFilmAction {
  return {
    type: ActionType.SetPromoFilm,
    payload: film,
  };
}

export function setManyFavoriteFilms(films: Film[]): AddManyFavoriteFilmsAction {
  return {
    type: ActionType.SetManyFavoriteFilms,
    payload: films,
  };
}

export function changeFavoriteFilm(film: Film): ChangeFavoriteFilmAction {
  return {
    type: ActionType.ChangeFavoriteFilmAction,
    payload: film,
  };
}

//Thunks

// export function signIn(user: User) {
//   return async function (dispatch: AppDispatch, getState: RootState, api: AxiosInstance): Promise<void> {
//     const response = await api.post('/login', user);
//     console.log(response);
//     dispatch();
//   };
// }
//
// export function checkToken() {
//   return async function (dispatch: any, getState: any, api: any) {
//     console.log('checking token');
//   };
// }
