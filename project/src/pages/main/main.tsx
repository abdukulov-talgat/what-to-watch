import SmallFilmCard from '../../components/small-film-card/small-film-card';
import { useAppSelector } from '../../hooks/store';
import PageFooter from '../../components/page-footer/page-footer';
import GenresList from '../../components/genres-list/genres-list';
import React, { useEffect, useState } from 'react';
import { mapFilmsToGenres } from '../../utils';
import { Film } from '../../types/models';
import { createAPI } from '../../services/api';
import { ApiRoute } from '../../const';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/spinner/spinner';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import PlayButton from '../../components/play-button/play-button';
import FavoriteButton from '../../components/favorite-button/favorite-button';

const MAX_GENRES = 10; //with All Genres
const CARDS_TO_RENDER_INIT = 8;
const MORE_PER_STEP = 8;
const ALL_GENRES = 'All genres';

function Main(): JSX.Element {
  const [promo, setPromo] = useState<Film | null>(null);
  const films = useAppSelector((state) => state.films);
  const [activeGenreIndex, setActiveGenreIndex] = useState(0);
  const genres = [
    ALL_GENRES,
    ...mapFilmsToGenres(films).slice(0, MAX_GENRES)
  ];
  const [cardsToRender, setCardsToRender] = useState(CARDS_TO_RENDER_INIT);

  const isLoading = !promo;
  const filteredFilms = genres[activeGenreIndex] === ALL_GENRES ?
    films : films.filter((film) => film.genre === genres[activeGenreIndex]);

  function handleGenreChange(genre: string) {
    const index = genres.indexOf(genre);
    setActiveGenreIndex(index);
    setCardsToRender(CARDS_TO_RENDER_INIT);
  }

  useEffect(() => {
    createAPI()
      .get<Film>(ApiRoute.Promo())
      .then((response) => {
        setPromo(response.data);
      })
      .catch((err: AxiosError) => {
        toast.error(err.message);
      });
  }, []);

  return (
    isLoading ?
      <Spinner/>
      :
      <>
        <section className="film-card">
          <div className="film-card__bg">
            <img src={promo.backgroundImage} alt={promo.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <UserBlock/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__info">
              <div className="film-card__poster">
                <img src={promo.posterImage} alt={promo.name} width="218"
                  height="327"
                />
              </div>

              <div className="film-card__desc">
                <h2 className="film-card__title">{promo.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{promo.genre}</span>
                  <span className="film-card__year">{promo.released}</span>
                </p>

                <div className="film-card__buttons">
                  <PlayButton filmId={promo.id}/>
                  <FavoriteButton filmId={promo.id}/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenresList
              activeGenre={genres[activeGenreIndex]}
              genres={genres}
              onGenreChange={handleGenreChange}
            />

            <div className="catalog__films-list">
              {filteredFilms.slice(0, cardsToRender).map((film) => <SmallFilmCard key={film.id} film={film}/>)}
            </div>

            {
              cardsToRender < filteredFilms.length
                ?
                <div className="catalog__more">
                  <button className="catalog__button"
                    type="button"
                    onClick={() => setCardsToRender((prevState) =>
                      Math.min(prevState + MORE_PER_STEP, filteredFilms.length))}
                  >
                    Show more
                  </button>
                </div>
                :
                null
            }

          </section>

          <PageFooter/>
        </div>
      </>
  );
}

export default Main;
