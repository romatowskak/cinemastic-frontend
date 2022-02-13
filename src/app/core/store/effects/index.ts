import { AuthEffects } from './auth.effects';
import { BookingEffects } from './booking.effects';
import { MoviesEffects } from './movies.effects';
import { SnackBarEffects } from './snack-bar.effects';
import { SentryLogsEffects } from './sentry-log.effects';

export const effects = [AuthEffects, MoviesEffects, BookingEffects, SnackBarEffects, SentryLogsEffects];
