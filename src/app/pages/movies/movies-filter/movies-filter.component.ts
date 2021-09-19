import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieGenre } from 'src/app/shared/enums/MovieGenre';
import { formatToArray } from 'src/app/shared/utils/helpers';

@Component({
  selector: 'app-movies-filter',
  templateUrl: './movies-filter.component.html',
  styleUrls: ['./movies-filter.component.scss'],
})
export class MoviesFilterComponent implements OnInit {
  genreSelection = new SelectionModel<MovieGenre>(true);
  genres = [
    { value: MovieGenre.COMEDY, genre: 'movie.genre.comedy' },
    { value: MovieGenre.ANIMATION, genre: 'movie.genre.animation' },
    { value: MovieGenre.HORROR, genre: 'movie.genre.horror' },
    { value: MovieGenre.DRAMA, genre: 'movie.genre.drama' },
    { value: MovieGenre.ACTION, genre: 'movie.genre.action' },
    { value: MovieGenre.DOCUMENT, genre: 'movie.genre.document' },
    { value: MovieGenre.ROMANCE, genre: 'movie.genre.romance' },
  ];
  languageSelection = new SelectionModel<string>(true);
  languages = [
    { value: 'ENGLISH', language: 'movie.language.english' },
    { value: 'POLISH', language: 'movie.language.polish' },
    { value: 'ITALIAN', language: 'movie.language.italian' },
    { value: 'SPANISH', language: 'movie.language.spanish' },
  ];
  searchInputValue = '';

  constructor(private router: Router, private currentRoute: ActivatedRoute) {}

  ngOnInit() {
    const { genre, language } = this.currentRoute.snapshot.queryParams;
    const selectedGenres = genre ? formatToArray(genre) : [];
    const selectedLanguages = language ? formatToArray(language) : [];

    this.genreSelection.select(...selectedGenres);
    this.languageSelection.select(...selectedLanguages);

    const { query } = this.currentRoute.snapshot.queryParams;
    this.searchInputValue = query ? query : '';
  }

  search(searchQuery: string) {
    this.searchInputValue = searchQuery;
    if (searchQuery) {
      this.router.navigate([], { queryParams: { query: searchQuery }, queryParamsHandling: 'merge' });
    } else {
      this.clearSearch();
    }
  }

  clearSearch() {
    this.searchInputValue = '';
    this.router.navigate([], { queryParams: { ...this.currentRoute.snapshot.queryParams, query: null }, queryParamsHandling: 'merge' });
  }

  toggleGenre(genre: MovieGenre) {
    this.genreSelection.toggle(genre);
    this.router.navigate([], {
      queryParams: { genre: this.genreSelection.selected },
      queryParamsHandling: 'merge',
    });
  }

  toggleLanguage(language: string) {
    this.languageSelection.toggle(language);
    this.router.navigate([], {
      queryParams: { language: this.languageSelection.selected },
      queryParamsHandling: 'merge',
    });
  }
}
