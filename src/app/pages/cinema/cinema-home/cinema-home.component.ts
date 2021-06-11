import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import { signOut } from 'src/app/core/store/actions/auth.actions';
import { getMoviesRequest } from 'src/app/core/store/actions/movies.actions';
import { User } from 'src/app/shared/models/User';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';

@Component({
  selector: 'app-cinema-home',
  templateUrl: './cinema-home.component.html',
  styleUrls: ['./cinema-home.component.scss'],
})
export class CinemaHomeComponent implements OnInit {
  user: User;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.select(getSignedInUserSelector).subscribe((user: User) => {
      this.user = user;
    });
    this.store.dispatch(getMoviesRequest());
  }

  signOut() {
    this.store.dispatch(signOut());
  }
}
