import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import FilmDetails from '../../pages/film-details/film-details';
import Player from '../../pages/player/player';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import ProtectedRoute from '../protected-route/protected-route';
import { Film } from '../../types/models';


type AppProps = {
  films: Film[],
}

function App(props: AppProps): JSX.Element {
  const {films} = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main films={films} promo={films[0]}/>}/>
        <Route path={AppRoute.Login} element={<Login/>}/>
        <Route path={AppRoute.Film} element={<FilmDetails/>}/>
        <Route path={AppRoute.Player} element={<Player/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path={AppRoute.MyList} element={<MyList/>}/>
          <Route path={AppRoute.AddReview} element={<AddReview/>}/>
        </Route>
        <Route path="*" element={<div>NOT FOUND PAGE.</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
