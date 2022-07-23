import { Actions, ActionType } from '../types/actions';
import { AuthInfo, Film } from '../types/models';

export type StoreState = {
  authInfo: AuthInfo | null,
  films: Film[],
  isLoading: boolean,
}

const initialState: StoreState = {
  isLoading: true,
  authInfo: null,
  films: [],
};

function reducer(state: StoreState = initialState, action: Actions) {
  switch (action.type) {
    case ActionType.ChangeIsLoading:
      return {
        ...state,
        isLoading: action.payload
      };

    case ActionType.Login:
      return {
        ...state,
        authInfo: action.payload,
      };

    case ActionType.Logout:
      return {
        ...state,
        authInfo: null,
      };

    case ActionType.SetFilms:
      return {
        ...state,
        films: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
