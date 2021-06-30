import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getMoviesRequest } from 'src/app/core/store/actions/movies.actions';
import { State } from 'src/app/core/store/reducers';
import { getMoviesSelector } from 'src/app/core/store/reducers/movies.reducer';
import { Movie } from 'src/app/shared/models/Movie';
import { RemoveMovieDialogComponent } from '../../remove-movie-dialog/remove-movie-dialog.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  movies: Movie[];
  filteredMovies: Movie[];
  searchInputValue = '';
  isInEditMode: boolean;
  constructor(private store: Store<State>, private currentRoute: ActivatedRoute, private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    const { query } = this.currentRoute.snapshot.queryParams;
    this.searchInputValue = query ? query : '';

    const { movieId } = this.currentRoute.snapshot.params;
    this.isInEditMode = !!movieId;

    this.store.dispatch(getMoviesRequest());
    this.store.select(getMoviesSelector).subscribe((movies: Movie[]) => {
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

  onAddMovie() {
    this.router.navigate(['/cinemastic/create']);
  }
}
