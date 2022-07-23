import React, { useState } from 'react';
import { Film } from '../../types/models';
import { useNavigate } from 'react-router-dom';
import { ApiRoute } from '../../const';

type SmallFilmCardProps = {
  film: Film
}

const VIDEO_PREVIEW_DELAY = 500;

function SmallFilmCard({film}: SmallFilmCardProps) {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [timerId, setTimerId] = useState(0);

  function handleCardClick(evt: React.MouseEvent<HTMLElement>) {
    evt.preventDefault();
    navigate(ApiRoute.SingleFilm(film.id));
    window.scrollTo(0, 0);
  }

  function handleCardMouseEnter(evt: React.MouseEvent<HTMLElement>) {
    evt.preventDefault();

    setTimerId(window.setTimeout(() => {
      setShowVideo(true);
    }, VIDEO_PREVIEW_DELAY));
  }

  function handleCardMouseLeave(evt: React.MouseEvent<HTMLElement>) {
    evt.preventDefault();

    setShowVideo(false);
    clearTimeout(timerId);
  }

  return (
    <article className="small-film-card catalog__films-card" style={{position: 'relative'}}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
      onClick={handleCardClick}
    >
      <div className="small-film-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={ApiRoute.SingleFilm(film.id)} onClick={handleCardClick}>
          {film.name}
        </a>
      </h3>
      {showVideo &&
        <video
          src={film.previewVideoLink}
          style={{position: 'absolute', zIndex: 111, top: 0, left: 0, width: 280, height: 175, transform: 'scale(1.2)'}}
          autoPlay
        />}
    </article>
  );
}

export default SmallFilmCard;
