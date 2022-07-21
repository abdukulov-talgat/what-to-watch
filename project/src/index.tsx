import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import store from './store/store';
import { setManyFavoriteFilms, setAuthInfoAction, setFilms, setPromoFilm } from './store/actions';
import { authInfoMock, filmsMock } from './mocks/mocks';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(setAuthInfoAction(authInfoMock));
store.dispatch(setFilms(filmsMock));
store.dispatch(setPromoFilm(filmsMock[5]));
store.dispatch(setManyFavoriteFilms(filmsMock));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);


