import * as auth from './auth.reducer';
import * as movies from './movies.reducer';
import * as booking from './booking.reducer';
import * as appStatus from './app-status.reducer';

export const reducers = {
  appStatus: appStatus.reducer,
  authState: auth.reducer,
  moviesState: movies.reducer,
  bookingState: booking.reducer,
};

export interface State {
  appStatus: appStatus.AppStatusState;
  authState: auth.AuthState;
  moviesState: movies.MoviesState;
  bookingState: booking.BookingState;
}
