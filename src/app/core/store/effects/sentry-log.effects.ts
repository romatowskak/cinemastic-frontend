import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { tap, filter, map } from 'rxjs/internal/operators';
import * as Sentry from '@sentry/browser';
import { environment } from '../../../../environments/environment';
import { Action } from '@ngrx/store';

export interface PayloadAction extends Action {
  payload?: any;
}

@Injectable()
export class SentryLogsEffects {
  logAction$ = createEffect(
    () =>
      this.actions$.pipe(
        map((action: PayloadAction) => action),
        tap(({ type, payload }) => {
          Sentry.addBreadcrumb({
            category: 'ACTION',
            message: type,
            data: payload,
            level: Sentry.Severity.Info,
          });
        })
      ),
    { dispatch: false }
  );

  logFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        filter(() => environment.production),
        filter((action: PayloadAction) => action.type.endsWith('FAILURE')),
        tap(({ type, payload }) => {
          Sentry.captureEvent({
            message: type,
            level: Sentry.Severity.Warning,
            extra: payload,
          });
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
