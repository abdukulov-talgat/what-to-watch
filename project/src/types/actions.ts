import {
  changeIsLoading,
  logout,
  login,
  setFilms, updateFilm,
} from '../store/actions';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { StoreState } from '../store/reducer';
import { AxiosInstance } from 'axios';

export enum ActionType {
  ChangeIsLoading = 'init/isLoading',
  Login = 'user/login',
  Logout = 'user/logout',
  SetFilms = 'films/setFilms',
  UpdateFilm = 'films/updateFilm',
}

export type Actions =
  | ReturnType<typeof changeIsLoading>
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof setFilms>
  | ReturnType<typeof updateFilm>

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StoreState, AxiosInstance, Actions>
export type ThunkAppDispatch = ThunkDispatch<StoreState, AxiosInstance, Actions>
