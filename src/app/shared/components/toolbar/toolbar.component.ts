import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { signOut } from 'src/app/core/store/actions/auth.actions';
import { State } from 'src/app/core/store/reducers';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  user: User;

  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {
    this.userSubscription = this.store.select(getSignedInUserSelector).subscribe((user: User) => {
      this.user = user;
    });
  }

  goToMovies() {
    this.router.navigate(['./movies'], { queryParams: { day: 'All' } });
  }

  signOut() {
    this.store.dispatch(signOut());
  }

  onShowUserReservations() {
    this.router.navigate([`./reservations/${this.user.user.id}`]);
  }

  onManageMovies() {
    this.router.navigate(['./management/create']);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
