import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addMovieRequest, getMovieDetailsRequest, getMoviesRequest, updateMovieRequest } from 'src/app/core/store/actions/movies.actions';
import { State } from 'src/app/core/store/reducers';
import { getMovieDetailsSelector, getMoviesSelector } from 'src/app/core/store/reducers/movies.reducer';
import { Movie } from 'src/app/shared/models/Movie';
import { MoviePhoto } from '../../../../shared/models/MoviePhoto';
import { Pattern } from '../../../../shared/constants/RegexPattern';
import { MatDialog } from '@angular/material';
import { RemoveMovieDialogComponent } from '../remove-movie-dialog/remove-movie-dialog.component';

@Component({
  selector: 'app-movie-managing-panel',
  templateUrl: './movie-managing-panel.component.html',
  styleUrls: ['./movie-managing-panel.component.scss'],
})
export class MovieManagingPanelComponent implements OnInit {
  movieManagingForm: FormGroup;
  movies: Movie[];
  filteredMovies: Movie[];
  galleryPhotos: { uuid: string; file: MoviePhoto }[] = [];
  coverPhoto: { uuid: string; file: MoviePhoto };
  searchInputValue = '';
  isInEditMode: boolean;

  constructor(
    private store: Store<State>,
    private currentRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

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

    this.currentRoute.params.subscribe((params) => {
      if (params.movieId) {
        this.store.dispatch(getMovieDetailsRequest({ payload: { movieId: +params.movieId } }));
      }
    });

    if (movieId) {
      this.store.select(getMovieDetailsSelector).subscribe((movieDetails: Movie) => {
        this.createForm(movieDetails);
      });
    } else {
      this.createForm();
    }
  }

  createForm(movieDetails?: Movie) {
    this.movieManagingForm = this.formBuilder.group({
      title: [(movieDetails && movieDetails.title) || '', Validators.required],
      genre: [(movieDetails && movieDetails.genre) || '', Validators.required],
      production: [(movieDetails && movieDetails.production) || '', Validators.required],
      director: [(movieDetails && movieDetails.director) || '', Validators.required],
      duration: [(movieDetails && movieDetails.duration) || '', [Validators.required, Validators.pattern(Pattern.decimal)]],
      originalLanguage: [(movieDetails && movieDetails.originalLanguage) || '', Validators.required],
      subtitles: [(movieDetails && movieDetails.subtitles) || '', Validators.required],
      releaseDate: [(movieDetails && movieDetails.releaseDate) || '', Validators.required],
      overview: [(movieDetails && movieDetails.overview) || '', Validators.required],
      trailer: [(movieDetails && movieDetails.trailer) || '', [Validators.required, Validators.pattern(Pattern.link)]],
      coverPhoto: [(movieDetails && movieDetails.coverPhoto) || null, Validators.required],
      gallery: [(movieDetails && movieDetails.gallery) || []],
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

  coverPhotoChange(photos) {
    this.coverPhoto = {
      uuid: String(new Date().getTime()),
      file: photos[0],
    };

    const { coverPhoto } = this.movieManagingForm.controls;
    coverPhoto.setValue(this.coverPhoto.file);
  }

  galleryPhotosChange(photos) {
    if (photos.length) {
      this.galleryPhotos.push({
        uuid: String(new Date().getTime()),
        file: photos[0],
      });
    }

    const { gallery } = this.movieManagingForm.controls;
    gallery.setValue([...this.galleryPhotos.map((photo) => photo.file), ...gallery.value]);
  }

  removeCoverPhoto() {
    const { coverPhoto } = this.movieManagingForm.controls;
    coverPhoto.setValue(null);
  }

  removeGalleryPhoto(photoId: number) {
    const { gallery } = this.movieManagingForm.controls;
    gallery.setValue([...gallery.value.filter((photo) => photo.id !== photoId)]);
  }

  saveChanges() {
    this.movieManagingForm.markAllAsTouched();
    const { movieId } = this.currentRoute.snapshot.params;
    const movie = this.movieManagingForm.value;
    const payload = { movie: { ...movie, id: movieId }, uploadPhotos: this.galleryPhotos, coverPhoto: this.coverPhoto };

    if (this.movieManagingForm.status === 'VALID') {
      if (movieId) {
        this.store.dispatch(updateMovieRequest({ payload }));
      } else {
        this.store.dispatch(addMovieRequest({ payload }));
      }
    }
  }
}
