import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createMovieRequest, updateMovieRequest } from 'src/app/core/store/actions/movies.actions';
import { State } from 'src/app/core/store/reducers';
import { getMovieDetailsSelector } from 'src/app/core/store/reducers/movies.reducer';
import { Pattern } from 'src/app/shared/constants/RegexPattern';
import { Movie } from 'src/app/shared/models/Movie';
import { MoviePhoto } from 'src/app/shared/models/MoviePhoto';

@Component({
  selector: 'app-movie-details-form',
  templateUrl: './movie-details-form.component.html',
  styleUrls: ['./movie-details-form.component.scss'],
})
export class MovieDetailsFormComponent implements OnInit {
  movieDetailsForm: FormGroup;
  uploadedMoviePhotos: { uuid: string; file: MoviePhoto }[] = [];
  coverPhoto: { uuid: string; file: MoviePhoto };
  isInEditMode: boolean;

  constructor(
    private store: Store<State>,
    private currentRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    const { movieId } = this.currentRoute.snapshot.params;
    this.isInEditMode = !!movieId;

    if (movieId) {
      this.store.select(getMovieDetailsSelector).subscribe((movieDetails: Movie) => {
        this.createForm(movieDetails);
      });
    } else {
      this.createForm();
    }
  }

  createForm(movieDetails?: Movie) {
    this.movieDetailsForm = this.formBuilder.group({
      title: [movieDetails?.title || '', Validators.required],
      genre: [movieDetails?.genre || '', Validators.required],
      production: [movieDetails?.production || '', Validators.required],
      director: [movieDetails?.director || '', Validators.required],
      duration: [movieDetails?.duration || '', [Validators.required, Validators.pattern(Pattern.decimal)]],
      originalLanguage: [movieDetails?.originalLanguage || '', Validators.required],
      subtitles: [movieDetails?.subtitles || '', Validators.required],
      releaseDate: [movieDetails?.releaseDate || ''],
      overview: [movieDetails?.overview || '', Validators.required],
      trailer: [movieDetails?.trailer || '', [Validators.pattern(Pattern.link)]],
      coverPhoto: [movieDetails?.coverPhoto || null, Validators.required],
      gallery: [movieDetails?.gallery || []],
    });
  }

  onAddMovie() {
    this.router.navigate(['/management/create']);
  }

  coverPhotoChange(photos) {
    this.coverPhoto = {
      uuid: String(new Date().getTime()),
      file: photos[0],
    };

    const { coverPhoto } = this.movieDetailsForm.controls;
    coverPhoto.setValue(this.coverPhoto.file);
  }

  galleryPhotosChange(photos) {
    if (photos.length) {
      this.uploadedMoviePhotos.push({
        uuid: String(new Date().getTime()),
        file: photos[0],
      });
    }
  }

  removeCoverPhoto() {
    const { coverPhoto } = this.movieDetailsForm.controls;
    coverPhoto.setValue(null);
  }

  removeUploadedPhoto(photoId: string) {
    this.uploadedMoviePhotos = this.uploadedMoviePhotos.filter((photo) => photo.uuid !== photoId);
  }

  removeGalleryPhoto(photoId: number) {
    const { gallery } = this.movieDetailsForm.controls;
    gallery.setValue([...gallery.value.filter((photo) => photo.id !== photoId)]);
  }

  saveChanges() {
    this.movieDetailsForm.markAllAsTouched();
    const { movieId } = this.currentRoute.snapshot.params;
    const movie = this.movieDetailsForm.value;
    const payload = { movie: { ...movie, id: movieId }, uploadPhotos: this.uploadedMoviePhotos, coverPhoto: this.coverPhoto };

    if (this.movieDetailsForm.status === 'VALID') {
      this.uploadedMoviePhotos = [];
      if (movieId) {
        this.store.dispatch(updateMovieRequest({ payload }));
      } else {
        this.store.dispatch(createMovieRequest({ payload }));
      }
    }
  }
}
