import { AuthInfo, Film, UserCredentials, } from '../types/models';
import { ActionType, ThunkActionResult, } from '../types/actions';

import { ApiRoute } from '../const';
import { removeToken, saveToken } from '../services/token';


export function changeIsLoading(isLoading: boolean) {
  return {
    type: ActionType.ChangeIsLoading,
    payload: isLoading
  } as const;
}

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

export function updateFilm(film: Film) {
  return {
    type: ActionType.UpdateFilm,
    payload: film
  } as const;
}

//Thunks

export function checkToken(): ThunkActionResult {
  return async function (dispatch, getState, api) {
    const response = await api.get<AuthInfo>(ApiRoute.CheckToken());
    dispatch(login(response.data));
  };
}

export function signIn(credentials: UserCredentials): ThunkActionResult {
  return async function (dispatch, getState, api) {
    const response = await api.post<AuthInfo>(ApiRoute.SignIn(), credentials);
    saveToken(response.data.token);
    dispatch(loadFilms());
    dispatch(login(response.data));
  };
}

export function signOut(): ThunkActionResult {
  return async function (dispatch, getState, api) {
    await api.delete(ApiRoute.SignOut());
    removeToken();
    dispatch(loadFilms());
    dispatch(logout());
  };
}

export function loadFilms(): ThunkActionResult {
  return async function (dispatch, getState, api) {
    const response = await api.get<Film[]>(ApiRoute.Films());
    dispatch(setFilms(response.data));
  };
}

export function changeFavoriteStatus(id: number, isFavorite: boolean): ThunkActionResult {
  return async function (dispatch, getState, api) {
    const response = await api.post<Film>(ApiRoute.ChangeFavoriteStatus(id, !isFavorite));
    dispatch(updateFilm(response.data));
  };
}
