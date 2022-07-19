import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Film from '../../pages/film/film';
import Player from '../../pages/player/player';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import ProtectedRoute from '../protected-route/protected-route';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Film} element={<Film />} />
        <Route path={AppRoute.Player} element={<Player />} />
        <Route element={<ProtectedRoute />}>
          <Route path={AppRoute.MyList} element={<MyList />} />
          <Route path={AppRoute.AddReview} element={<AddReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
