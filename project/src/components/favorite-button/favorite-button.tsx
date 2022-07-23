import React from 'react';
import { useAppSelector } from '../../hooks/store';


type FavoriteButtonProps = {
  isFavorite: boolean,
}

function FavoriteButton({isFavorite}: FavoriteButtonProps) {
  const favoriteFilmsCount = useAppSelector(
    (state) => state.films.filter((film) => film.isFavorite).length);

  return (
    <button className="btn btn--list film-card__button" type="button">
      {
        isFavorite ?
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
          :
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
      }
      <span>My list</span>
      <span className="film-card__count">{favoriteFilmsCount}</span>

    </button>
  );
}

export default FavoriteButton;

