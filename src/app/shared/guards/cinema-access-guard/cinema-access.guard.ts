import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class CinemaAccessGuard implements CanActivateChild {
  user: User;

  constructor(private store: Store<State>, private router: Router) {}
  canActivateChild(): boolean {
    this.store.select(getSignedInUserSelector).subscribe((user: User) => {
      this.user = user;
    });

    if (this.user) {
      return true;
    } else {
      this.router.navigate(['start/signin']);
    }
  }
}
