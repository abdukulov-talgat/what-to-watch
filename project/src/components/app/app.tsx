import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import FilmDetails from '../../pages/film-details/film-details';
import Player from '../../pages/player/player';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import ProtectedRoute from '../protected-route/protected-route';
import NotFound from '../../pages/not-found/not-found';


function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main/>}/>
        <Route path={AppRoute.Login} element={<Login/>}/>
        <Route path={AppRoute.Film} element={<FilmDetails/>}/>
        <Route path={AppRoute.Player} element={<Player/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path={AppRoute.MyList} element={<MyList/>}/>
          <Route path={AppRoute.AddReview} element={<AddReview/>}/>
        </Route>
        <Route path={AppRoute.NotFound} element={<NotFound/>}/>
        <Route path="*" element={<Navigate to={AppRoute.NotFound}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
