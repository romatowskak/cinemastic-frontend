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
    { day: 'All' },
    { day: 'Monday' },
    { day: 'Tuesday' },
    { day: 'Wednesday' },
    { day: 'Thursday' },
    { day: 'Friday' },
    { day: 'Saturday' },
    { day: 'Sunday' },
  ];
  dayParam: string;
  user: User;

  constructor(private store: Store<State>, private router: Router, private currentRoute: ActivatedRoute) {}

  ngOnInit() {
    const { day } = this.currentRoute.snapshot.queryParams;
    if (!day) {
      this.router.navigate([], { queryParams: { day: 'All' } });
    } else {
      this.dayParam = day;
    }
    this.store.select(getSignedInUserSelector).subscribe((user) => {
      this.user = user;
    });

    this.moviesSubscription = this.store.select(getMoviesSelector).subscribe((movies: Movie[]) => {
      this.movies = movies;
      const { queryParams } = this.currentRoute.snapshot;
      if (this.movies.length) {
        this.filterMovies(queryParams);
      }
    });

    this.currentRoute.queryParams.subscribe((queryParams) => {
      this.dayParam = queryParams.day;
      this.filterMovies(queryParams);
    });
  }

  filterMovies(queryParams) {
    const { genre, language } = queryParams;
    let movies = this.movies;
    if (genre) {
      movies = this.fiterByGenre(formatToArray(genre));
    }
    if (language) {
      movies = this.filterByLanguage(formatToArray(language));
    }
    this.filteredMovies = movies;
  }

  fiterByGenre(genres: MovieGenre[]) {
    return genres && genres.length
      ? this.movies.filter((movie: Movie) => genres.find((genre: MovieGenre) => genre === movie.genre))
      : this.movies;
  }

  filterByLanguage(languages: MovieLanguage[]) {
    return languages && languages.length
      ? this.movies.filter((movie: Movie) => languages.find((language: MovieLanguage) => language === movie.original_language))
      : this.movies;
  }

  onShowMovieDetails(movie: Movie) {
    this.router.navigate(['/cinemastic/movies/', movie.id]);
  }

  onWeekDaySelection(day: string) {
    this.router.navigate([], { queryParams: { day } });
  }

  ngOnDestroy() {
    this.moviesSubscription.unsubscribe();
  }
}
