import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import PageFooter from '../../components/page-footer/page-footer';
import { useEffect, useState } from 'react';
import Spinner from '../../components/spinner/spinner';
import { createAPI } from '../../services/api';
import { Film } from '../../types/models';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ApiRoute } from '../../const';
import SmallFilmCard from '../../components/small-film-card/small-film-card';

function MyList() {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    createAPI().get<Film[]>(ApiRoute.Favorite())
      .then((response) => setFilms(response.data))
      .catch((err: AxiosError) => toast.error(err.message))
      .finally(() => setIsLoading(false));

  }, []);

  return (
    isLoading ?
      <Spinner/>
      :
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo/>
          <h1 className="page-title user-page__title">My list
            <span className="user-page__film-count">{films.length}</span>
          </h1>
          <UserBlock/>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__films-list">
            {films.map((film) => <SmallFilmCard key={film.id} film={film}/>)}
          </div>
        </section>

        <PageFooter/>
      </div>
  );
}

export default MyList;
