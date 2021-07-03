import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInRequest),
      map((payload) => payload.payload),
      switchMap(({ username, password }) =>
        this.authService.signIn(username, password).pipe(
          map((response) => AuthActions.signInSuccess({ payload: response })),
          catchError((error) => of(AuthActions.signInFailure({ payload: error })))
        )
      )
    )
  );

  redirectAfterSignIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() => {
          this.router.navigate(['/cinemastic/movies']);
        })
      ),
    {
      dispatch: false,
    }
  );

  redirectAfterSignOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signOut),
        tap(() => {
          this.router.navigate(['/start/signin']);
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
