import { AuthInfo, Film, UserCredentials, } from '../types/models';
import { ActionType, ThunkActionResult, } from '../types/actions';

import { ApiRoute } from '../const';
import { removeToken, saveToken } from '../services/token';


export function login(payload: AuthInfo) {
  return {
    type: ActionType.Login,
    payload: payload
  } as const;
}

export function logout() {
  return {
    type: ActionType.Logout
  } as const;
}

export function setFilms(films: Film[]) {
  return {
    type: ActionType.SetFilms,
    payload: films,
  } as const;
}

export function setPromo(film: Film) {
  return {
    type: ActionType.SetPromo,
    payload: film,
  } as const;
}

export function setFavoriteFilms(films: Film[]) {
  return {
    type: ActionType.SetFavoriteFilms,
    payload: films,
  } as const;
}

export function changeFavoriteFilm(film: Film) {
  return {
    type: ActionType.ChangeFavoriteStatus,
    payload: film,
  } as const;
}

export function changeIsLoading(isLoading: boolean) {
  return {
    type: ActionType.ChangeIsLoading,
    payload: isLoading
  } as const;
}

//Thunks

export function checkToken(): ThunkActionResult {
  return async function (dispatch, getState, api) {
    const response = await api.get<AuthInfo>(ApiRoute.checkToken());
    dispatch(login(response.data));
  };
}

export function signIn(credentials: UserCredentials): ThunkActionResult {
  return async function (dispatch, getState, api) {
    const response = await api.post<AuthInfo>(ApiRoute.signIn(), credentials);
    saveToken(response.data.token);
    dispatch(login(response.data));
  };
}

export function signOut(): ThunkActionResult {
  return async function (dispatch, getState, api) {
    await api.delete(ApiRoute.logOut());
    removeToken();
    dispatch(logout());
  };
}

export function loadPromo(): ThunkActionResult {
  return async function (dispatch, getState, api) {
    const response = await api.get<Film>(ApiRoute.Promo());
    dispatch(setPromo(response.data));
  };
}

export function loadFilms(): ThunkActionResult {
  return async function (dispatch, getState, api) {
    const response = await api.get<Film[]>(ApiRoute.Films());
    dispatch(setFilms(response.data));
  };
}

export function loadFavoriteFilms(): ThunkActionResult {
  return async function (dispatch, getState, api) {
    const response = await api.get<Film[]>(ApiRoute.FavoriteFilms());
    dispatch(setFavoriteFilms(response.data));
  };
}
