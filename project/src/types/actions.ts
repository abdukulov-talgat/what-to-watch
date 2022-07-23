import {
  changeFavoriteFilm,
  logout,
  login,
  setFilms,
  setPromo,
  changeIsLoading,
  setFavoriteFilms
} from '../store/actions';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { StoreState } from '../store/reducer';
import { AxiosInstance } from 'axios';

export enum ActionType {
  Login = 'user/login',
  Logout = 'user/logout',
  SetFilms = 'data/films',
  SetPromo = 'data/promo',
  SetFavoriteFilms = 'data/favoriteFilms',
  ChangeFavoriteStatus = 'favorite/changeStatus',
  ChangeIsLoading = 'init/isLoading',
}

export type Actions =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof setFilms>
  | ReturnType<typeof setPromo>
  | ReturnType<typeof setFavoriteFilms>
  | ReturnType<typeof changeFavoriteFilm>
  | ReturnType<typeof changeIsLoading>

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StoreState, AxiosInstance, Actions>
export type ThunkAppDispatch = ThunkDispatch<StoreState, AxiosInstance, Actions>
