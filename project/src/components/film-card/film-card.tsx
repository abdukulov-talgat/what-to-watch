import React from 'react';
import { Film } from '../../types/models';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import FavoriteButton from '../favorite-button/favorite-button';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';


type FilmCardProps = {
  film: Film,
}

function FilmCard({film}: FilmCardProps) {
  const navigate = useNavigate();

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={film.backgroundImg} alt={film.name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo/>
        <UserBlock/>
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={film.posterImg} alt={film.name} width="218"
              height="327"
            />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{film.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.released}</span>
            </p>

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button"
                onClick={() => navigate(AppRoute.Player.replace(':id', film.id.toString())
                )}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <FavoriteButton isFavorite={film.isFavorite}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmCard;
