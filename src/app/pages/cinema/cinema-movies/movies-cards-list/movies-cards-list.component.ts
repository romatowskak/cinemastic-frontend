import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from 'src/app/core/store/reducers';
import { Movie } from 'src/app/shared/models/Movie';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieGenreImageDictionary } from 'src/app/shared/constants/MovieGenresImagesDictionary';
import { formatToArray } from 'src/app/shared/utils/helpers';
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
  selector: 'app-movies-cards-list',
  templateUrl: './movies-cards-list.component.html',
  styleUrls: ['./movies-cards-list.component.scss'],
})
export class MoviesCardsListComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  moviesSubscription: Subscription;
  userSubscription: Subscription;
  filteredMovies: Movie[];
  movieGenreImageDictionary = MovieGenreImageDictionary;
  apiUrl = environment.apiUrl;
  user: User;
  weekDays = [
    { value: 'All', day: 'movie.screenings.all' },
    { value: 'Monday', day: 'movie.screenings.monday' },
    { value: 'Tuesday', day: 'movie.screenings.tuesday' },
    { value: 'Wednesday', day: 'movie.screenings.wednesday' },
    { value: 'Thursday', day: 'movie.screenings.thursday' },
    { value: 'Friday', day: 'movie.screenings.friday' },
    { value: 'Saturday', day: 'movie.screenings.saturday' },
    { value: 'Sunday', day: 'movie.screenings.sunday' },
  ];
  dayParam: string;
  constructor(private store: Store<State>, private router: Router, private currentRoute: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    const { day } = this.currentRoute.snapshot.queryParams;
    if (!day) {
      this.router.navigate([], { queryParams: { day: 'All' } });
      this.dayParam = day;
    }

    this.userSubscription = this.store.select(getSignedInUserSelector).subscribe((user) => {
      this.user = user;
    });

    this.store.dispatch(getMoviesRequest());

    this.moviesSubscription = this.store.select(getMoviesSelector).subscribe((movies: Movie[]) => {
      this.movies = movies;
      const { queryParams } = this.currentRoute.snapshot;

      this.filterMovies(queryParams);
    });

    this.currentRoute.queryParams.subscribe((queryParams) => {
      this.filterMovies(queryParams);
    });
  }

  filterMovies(queryParams) {
    const { day, genre, language, query } = queryParams;
    let movies = this.movies;

    if (day) movies = this.filterByScreeningDay(movies, day);
    if (genre) movies = this.fiterByGenre(movies, formatToArray(genre));
    if (language) movies = this.filterByLanguage(movies, formatToArray(language));
    if (query) movies = this.filterBySearchQuery(movies, query);

    this.filteredMovies = movies;
  }

  onWeekDaySelection(day: string) {
    this.dayParam = day;
    this.router.navigate([], { queryParams: { day } });
  }

  filterByScreeningDay(movies: Movie[], day: string) {
    return day && day !== 'All' ? movies.filter((movie: Movie) => movie.screenings.find((screening) => screening.day === day)) : movies;
  }

  fiterByGenre(movies: Movie[], genres: MovieGenre[]) {
    return genres && genres.length
      ? movies.filter((movie: Movie) => genres.find((genre: MovieGenre) => genre.toLocaleLowerCase() === movie.genre.toLocaleLowerCase()))
      : movies;
  }

  filterByLanguage(movies: Movie[], languages: string[]) {
    return languages && languages.length
      ? movies.filter((movie: Movie) => languages.find((language) => language.toLowerCase() === movie.originalLanguage.toLowerCase()))
      : movies;
  }

  filterBySearchQuery(movies: Movie[], query: string) {
    return query ? movies.filter((movie: Movie) => movie.title.toLowerCase().includes(query.toLowerCase())) : this.movies;
  }

  onShowMovieDetails(movie: Movie) {
    this.router.navigate(['/cinemastic/movies/', movie.id]);
  }

  onShowMovieScreenings(movie: Movie) {
    this.dialog.open(MovieScreeningsDialogComponent, {
      width: '50vw',
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
    this.userSubscription.unsubscribe();
    this.moviesSubscription.unsubscribe();
  }
}
