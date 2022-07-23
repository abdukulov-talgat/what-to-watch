import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import store from './store/store';
import { changeIsLoading, checkToken, loadFavoriteFilms, loadFilms, loadPromo } from './store/actions';
import { getToken } from './services/token';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

if (getToken()) {
  store.dispatch(checkToken())
    .then(() => {
      store.dispatch(loadFavoriteFilms());
    })
    .finally(() => {
      store.dispatch(changeIsLoading(false));
    });
} else {
  store.dispatch(changeIsLoading(false));
}

store.dispatch(loadPromo());
store.dispatch(loadFilms());


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);


