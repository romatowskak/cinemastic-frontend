import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { signOut } from 'src/app/core/store/actions/auth.actions';
import { State } from 'src/app/core/store/reducers';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';
import { User } from 'src/app/shared/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss'],
})
export class CinemaComponent implements OnInit {
  user: User;

  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {
    this.store.select(getSignedInUserSelector).subscribe((user: User) => {
      this.user = user;
    });
  }

  signOut() {
    this.store.dispatch(signOut());
  }

  onShowUserReservations() {
    this.router.navigate([`/cinemastic/reservations/${this.user.user.id}`]);
  }
}
