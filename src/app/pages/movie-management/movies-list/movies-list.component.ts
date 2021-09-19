import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import { getMoviesSelector } from 'src/app/core/store/reducers/movies.reducer';
import { Movie } from 'src/app/shared/models/Movie';
import { Subscription } from 'rxjs';
import { RemoveMovieDialogComponent } from '../remove-movie-dialog/remove-movie-dialog.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  movieSubscription: Subscription;
  movies: Movie[];
  filteredMovies: Movie[];
  searchInputValue = '';

  constructor(private store: Store<State>, private currentRoute: ActivatedRoute, private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    const { query } = this.currentRoute.snapshot.queryParams;
    this.searchInputValue = query ? query : '';

    this.movieSubscription = this.store.select(getMoviesSelector).subscribe((movies: Movie[]) => {
      this.movies = movies;
      this.filteredMovies = movies;
    });
  }

  search(searchQuery: string) {
    this.filteredMovies = this.movies.filter((movie: Movie) => movie.title.includes(searchQuery));
  }

  onRemoveMovie(movie: Movie) {
    this.dialog.open(RemoveMovieDialogComponent, {
      width: '400px',
      height: 'auto',
      data: movie,
    });
  }

  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }
}
