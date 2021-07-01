import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import * as SnackBarActions from '../actions/snack-bar.actions';
import { map, tap, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarEffects {
  showToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SnackBarActions.showSnackBar),
        map((action) => action.payload),
        switchMap((payload) => this.translate.get(payload.message)),
        tap((message) => {
          this.snackBar.open(message, '', {
            duration: 3000,
            panelClass: 'snack-bar',
          });
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private translate: TranslateService, private snackBar: MatSnackBar) {}
}
