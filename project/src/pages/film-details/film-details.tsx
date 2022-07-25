import PageFooter from '../../components/page-footer/page-footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Film } from '../../types/models';
import { createAPI } from '../../services/api';
import { ApiRoute, AppRoute, REDIRECT_DELAY } from '../../const';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import PlayButton from '../../components/play-button/play-button';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import FilmTabs from '../../components/film-tabs/film-tabs';
import { useAppSelector } from '../../hooks/store';


const MAX_SIMILAR_COUNT = 4;


function FilmDetails() {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [film, setFilm] = useState<Film | null>(null);
  const [similar, setSimilar] = useState<Film[]>([]);
  const authInfo = useAppSelector((state) => state.authInfo);


  useEffect(() => {
    const filmId = Number(id);
    const api = createAPI();

    api.get<Film>(ApiRoute.SingleFilm(filmId))
      .then((response) => setFilm(response.data))
      .catch((err: AxiosError) => {
        toast.error(err.message);
        setTimeout(() => navigate(AppRoute.Main), REDIRECT_DELAY);
      });

    api.get<Film[]>(ApiRoute.SimilarFilms(filmId))
      .then((response) => setSimilar(response.data))
      .catch((err: AxiosError) => {
        toast.error(err.message);
      });

  }, [id, navigate]);


  return (
    film &&
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <UserBlock/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton filmId={film.id}/>
                <FavoriteButton filmId={film.id}/>
                {authInfo &&
                  <Link to={AppRoute.AddReview.replace(':id', film.id.toString())}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327"/>
            </div>

            <FilmTabs film={film}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <div className="catalog__films-list">
            {similar.slice(0, MAX_SIMILAR_COUNT).map((sim) => <SmallFilmCard key={sim.id} film={sim}/>)}
          </div>
        </section>

        <PageFooter/>
      </div>
    </>
  );
}

export default FilmDetails;
