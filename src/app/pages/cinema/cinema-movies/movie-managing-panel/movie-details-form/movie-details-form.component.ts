import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { createMovieRequest, getMovieDetailsRequest, updateMovieRequest } from 'src/app/core/store/actions/movies.actions';
import { State } from 'src/app/core/store/reducers';
import { getMovieDetailsSelector } from 'src/app/core/store/reducers/movies.reducer';
import { fadeInAnimation } from 'src/app/shared/animations/fade-in.animation';
import { Pattern } from 'src/app/shared/constants/RegexPattern';
import { Movie } from 'src/app/shared/models/Movie';
import { MoviePhoto } from 'src/app/shared/models/MoviePhoto';

@Component({
  selector: 'app-movie-details-form',
  templateUrl: './movie-details-form.component.html',
  styleUrls: ['./movie-details-form.component.scss'],
  animations: [fadeInAnimation],
})
export class MovieDetailsFormComponent implements OnInit {
  movieDetailsForm: FormGroup;
  galleryPhotos: { uuid: string; file: MoviePhoto }[] = [];
  coverPhoto: { uuid: string; file: MoviePhoto };

  constructor(private store: Store<State>, private currentRoute: ActivatedRoute, private formBuilder: FormBuilder) {}

  ngOnInit() {
    const { movieId } = this.currentRoute.snapshot.params;

    this.currentRoute.params.subscribe((params) => {
      if (params.movieId) this.store.dispatch(getMovieDetailsRequest({ payload: { movieId: +params.movieId } }));
    });

    if (movieId)
      this.store.select(getMovieDetailsSelector).subscribe((movieDetails: Movie) => {
        this.createForm(movieDetails);
      });
    else this.createForm();
  }

  createForm(movieDetails?: Movie) {
    this.movieDetailsForm = this.formBuilder.group({
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

  coverPhotoChange(photos) {
    this.coverPhoto = {
      uuid: String(new Date().getTime()),
      file: photos[0],
    };

    const { coverPhoto } = this.movieDetailsForm.controls;
    coverPhoto.setValue(this.coverPhoto.file);
  }

  galleryPhotosChange(photos) {
    if (photos.length)
      this.galleryPhotos.push({
        uuid: String(new Date().getTime()),
        file: photos[0],
      });

    const { gallery } = this.movieDetailsForm.controls;
    gallery.setValue([...this.galleryPhotos.map((photo) => photo.file), ...gallery.value]);
  }

  removeCoverPhoto() {
    const { coverPhoto } = this.movieDetailsForm.controls;
    coverPhoto.setValue(null);
  }

  removeGalleryPhoto(photoId: number) {
    const { gallery } = this.movieDetailsForm.controls;
    gallery.setValue([...gallery.value.filter((photo) => photo.id !== photoId)]);
  }

  saveChanges() {
    this.movieDetailsForm.markAllAsTouched();
    const { movieId } = this.currentRoute.snapshot.params;
    const movie = this.movieDetailsForm.value;
    const payload = { movie: { ...movie, id: movieId }, uploadPhotos: this.galleryPhotos, coverPhoto: this.coverPhoto };

    if (this.movieDetailsForm.status === 'VALID')
      if (movieId) this.store.dispatch(updateMovieRequest({ payload }));
      else this.store.dispatch(createMovieRequest({ payload }));
  }
}
