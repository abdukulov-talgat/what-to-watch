import React from 'react';
import { Film } from '../../types/models';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type SmallFilmCardProps = {
  film: Film
}

function SmallFilmCard({film}: SmallFilmCardProps) {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film.replace(':id', film.id.toString())}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
