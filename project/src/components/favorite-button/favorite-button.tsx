import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { changeFavoriteStatus } from '../../store/actions';


type FavoriteButtonProps = {
  filmId: number,
}

function FavoriteButton({filmId}: FavoriteButtonProps) {
  const authInfo = useAppSelector((state) => state.authInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoriteFilmsCount = useAppSelector(
    (state) => state.films.filter((film) => film.isFavorite).length);
  const film = useAppSelector((state) => state.films.find((item) => item.id === filmId));
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  if (!film) {
    return <Navigate to={AppRoute.NotFound} replace/>;
  }

  async function handleButtonClick(evt: React.MouseEvent<HTMLButtonElement>) {
    evt.preventDefault();
    if (!film) {
      return;
    }
    if (!authInfo) {
      return navigate(AppRoute.Login);
    }

    setIsChangingStatus(true);
    await dispatch(changeFavoriteStatus(filmId, film.isFavorite));
    setIsChangingStatus(false);
  }

  return (
    <button className="btn btn--list film-card__button"
      type="button"
      onClick={handleButtonClick}
      disabled={isChangingStatus}
    >
      {
        film.isFavorite ?
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
          :
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
      }
      <span>{isChangingStatus ? 'Changing...' : 'My list'}</span>
      <span className="film-card__count">{favoriteFilmsCount}</span>

    </button>
  );
}

export default FavoriteButton;

