import { Actions, ActionType } from '../types/actions';
import { AuthInfo, Film } from '../types/models';

export type StoreState = {
  authInfo: AuthInfo | null,
  favoriteFilms: Film[],
  films: Film[],
  promo: Film,
}

const initialState: StoreState = {
  authInfo: null,
  favoriteFilms: [],
  films: [],
  promo: {
    name: 'War of the Worlds',
    posterImg: 'https://10.react.pages.academy/static/film/poster/War_of_the_Worlds.jpg',
    previewImg: 'https://10.react.pages.academy/static/film/preview/war-of-the-worlds.jpg',
    backgroundImg: 'https://10.react.pages.academy/static/film/background/War_of_the_Worlds.jpg',
    backgroundColor: '#9B7E61',
    description: 'As Earth is invaded by alien tripod fighting machines, one family fights for survival.',
    rating: 9.3,
    scoresCount: 386834,
    director: 'Steven Spielberg',
    starring: [
      'Tom Cruise',
      'Dakota Fanning',
      'Tim Robbins'
    ],
    runTime: 116,
    genre: 'Adventure',
    released: 2005,
    id: 3,
    isFavorite: false,
    videoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    previewVideoLink: 'https://10.react.pages.academy/static/film/video/traffic.mp4'
  }
};

function reducer(state: StoreState = initialState, action: Actions) {
  switch (action.type) {
    case ActionType.SetAuthInfo:
      return {
        ...state,
        authInfo: action.payload,
      };
    case ActionType.RemoveAuthInfo:
      return {
        ...state,
        authInfo: null,
      };
    case ActionType.SetPromoFilm:
      return {
        ...state,
        promo: action.payload,
      };
    case ActionType.SetFilms:
      return {
        ...state,
        films: action.payload,
      };
    case ActionType.SetManyFavoriteFilms:
      return {
        ...state,
        favoriteFilms: action.payload,
      };
    case ActionType.ChangeFavoriteFilmAction: {
      const index = state.favoriteFilms.findIndex((film) => film.id === action.payload.id);
      let newFavoriteFilms: Film[];

      if (index === -1) {
        newFavoriteFilms = state.favoriteFilms.concat(action.payload);
      } else {
        newFavoriteFilms = [
          ...state.favoriteFilms.slice(0, index),
          action.payload,
          ...state.favoriteFilms.slice(index + 1),
        ];
      }
      return {
        ...state,
        favoriteFilms: newFavoriteFilms,
      };
    }
    default:
      return state;
  }
}

export default reducer;
