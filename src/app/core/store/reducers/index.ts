import * as auth from './auth.reducer';
import * as movies from './movies.reducer';
import * as booking from './booking.reducer';

export const reducers = {
  authState: auth.reducer,
  moviesState: movies.reducer,
  bookingState: booking.reducer,
};

export interface State {
  authState: auth.AuthState;
  moviesState: movies.MoviesState;
  bookingState: booking.BookingState;
}
