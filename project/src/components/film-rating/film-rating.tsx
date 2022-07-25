import React from 'react';
import { mapRatingToWord } from '../../utils';
import { Film } from '../../types/models';

type FilmRatingProps = {
  film: Film
}

function FilmRating({film}: FilmRatingProps) {
  return (
    <div className="film-rating">
      <div className="film-rating__score">{film.rating.toFixed(1)}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">{mapRatingToWord(film.rating)}</span>
        <span className="film-rating__count">{film.scoresCount} ratings</span>
      </p>
    </div>
  );
}

export default FilmRating;
