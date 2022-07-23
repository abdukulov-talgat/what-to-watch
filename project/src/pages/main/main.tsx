import FilmCard from '../../components/film-card/film-card';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import { useAppSelector } from '../../hooks/store';
import PageFooter from '../../components/page-footer/page-footer';
import GenresList from '../../components/genres-list/genres-list';
import { useEffect, useState } from 'react';
import { mapFilmsToGenres } from '../../utils';
import { Film } from '../../types/models';
import { createAPI } from '../../services/api';
import { ApiRoute } from '../../const';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/spinner/spinner';

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
        <FilmCard film={promo}/>
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
