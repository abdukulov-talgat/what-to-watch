import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import store from './store/store';
import { changeIsLoading, checkToken, loadFilms } from './store/actions';
import { getToken } from './services/token';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

init()
  .finally(() => store.dispatch(changeIsLoading(false)));

async function init() {
  if (getToken()) {
    await store.dispatch(checkToken());
  }
  await store.dispatch(loadFilms());
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);


