import thunk from 'redux-thunk';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createAPI } from '../services/api';
import reducer from './reducer';


const api = createAPI();

export const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument(api)
    )
  )
);


// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;


