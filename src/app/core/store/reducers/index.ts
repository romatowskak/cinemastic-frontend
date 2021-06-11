import * as auth from './auth.reducer';
import * as movies from './movies.reducer';

export const reducers = {
  authState: auth.reducer,
  moviesState: movies.reducer,
};

export interface State {
  authState: auth.AuthState;
  moviesState: movies.MoviesState;
}
