import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from 'src/app/core/store/reducers';
import { Movie } from 'src/app/shared/models/Movie';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieGenreImageDictionary } from 'src/app/shared/constants/MovieGenresImagesDictionary';
import { formatToArray } from 'src/app/shared/utils/helpers';
import { MovieLanguage } from 'src/app/shared/enums/MovieLanguage';
import { MovieGenre } from 'src/app/shared/enums/MovieGenre';
import { getMoviesSelector } from '../../../../core/store/reducers/movies.reducer';
import { environment } from 'src/environments/environment';
import { getSignedInUserSelector } from '../../../../core/store/reducers/auth.reducer';
import { User } from 'src/app/shared/models/User';
import { getMoviesRequest } from 'src/app/core/store/actions/movies.actions';
import { MatDialog } from '@angular/material';
import { MovieScreeningsDialogComponent } from '../movie-screenings-dialog/movie-screenings-dialog.component';
import { MovieTrailerDialogComponent } from '../movie-trailer-dialog/movie-trailer-dialog.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];
  moviesSubscription: Subscription;
  filteredMovies: Movie[];
  movieGenreImageDictionary = MovieGenreImageDictionary;
  apiUrl = environment.apiUrl;
  weekDays = [
    { value: 'Monday', day: 'movie.screenings.monday' },
    { value: 'Tuesday', day: 'movie.screenings.tuesday' },
    { value: 'Wednesday', day: 'movie.screenings.wednesday' },
    { value: 'Thursday', day: 'movie.screenings.thursday' },
    { value: 'Friday', day: 'movie.screenings.friday' },
    { value: 'Saturday', day: 'movie.screenings.saturday' },
    { value: 'Sunday', day: 'movie.screenings.sunday' },
  ];

  dayParam: string;
  user: User;

  constructor(private store: Store<State>, private router: Router, private currentRoute: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    this.store.select(getSignedInUserSelector).subscribe((user) => {
      this.user = user;
    });

    this.store.dispatch(getMoviesRequest());

    this.moviesSubscription = this.store.select(getMoviesSelector).subscribe((movies: Movie[]) => {
      this.movies = movies;
      const { queryParams } = this.currentRoute.snapshot;

      this.filterMovies(queryParams);
    });
    this.currentRoute.queryParams.subscribe((queryParams) => {
      this.dayParam = queryParams.day;
      this.filterMovies(queryParams);
    });
  }

  filterMovies(queryParams) {
    const { day, genre, language, query } = queryParams;
    let movies = this.movies;

    if (day) {
      movies = this.filterByScreeningDay(movies, day);
    }
    if (genre) {
      movies = this.fiterByGenre(movies, formatToArray(genre));
    }
    if (language) {
      movies = this.filterByLanguage(movies, formatToArray(language));
    }

    if (query) {
      movies = this.filterBySearchQuery(movies, query);
    }

    this.filteredMovies = movies;
  }

  filterByScreeningDay(movies: Movie[], day: string) {
    return day && day !== 'All' ? movies.filter((movie: Movie) => movie.screenings.find((screening) => screening.day === day)) : movies;
  }

  fiterByGenre(movies: Movie[], genres: MovieGenre[]) {
    return genres && genres.length ? movies.filter((movie: Movie) => genres.find((genre: MovieGenre) => genre === movie.genre)) : movies;
  }

  filterByLanguage(movies: Movie[], languages: MovieLanguage[]) {
    return languages && languages.length
      ? movies.filter((movie: Movie) => languages.find((language: MovieLanguage) => language === movie.originalLanguage))
      : movies;
  }

  filterBySearchQuery(movies: Movie[], query: string) {
    return query ? movies.filter((movie: Movie) => movie.title.includes(query)) : this.movies;
  }

  onShowMovieDetails(movie: Movie) {
    this.router.navigate(['/cinemastic/movie_details/', movie.id]);
  }

  onWeekDaySelection(day: string) {
    this.router.navigate([], { queryParams: { day } });
  }

  onAddMovie() {
    this.router.navigate(['/cinemastic/create']);
  }

  onShowMovieScreenings(movie: Movie) {
    this.dialog.open(MovieScreeningsDialogComponent, {
      width: '400px',
      height: 'auto',
      data: movie,
    });
  }

  onShowMovieTrailer(movie: Movie) {
    this.dialog.open(MovieTrailerDialogComponent, {
      data: movie,
    });
  }

  ngOnDestroy() {
    this.moviesSubscription.unsubscribe();
  }
}
