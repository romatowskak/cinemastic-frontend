import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { removeMovieRequest } from 'src/app/core/store/actions/movies.actions';
import { State } from 'src/app/core/store/reducers';
import { Movie } from 'src/app/shared/models/Movie';

@Component({
  selector: 'app-remove-movie-dialog',
  templateUrl: './remove-movie-dialog.component.html',
  styleUrls: ['./remove-movie-dialog.component.scss'],
})
export class RemoveMovieDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Movie, private store: Store<State>) {}

  ngOnInit() {}

  onRemoveMovie() {
    this.store.dispatch(removeMovieRequest({ payload: { movieId: this.data.id } }));
  }
}
