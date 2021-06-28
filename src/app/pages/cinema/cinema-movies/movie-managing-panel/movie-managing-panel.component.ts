import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { addMovieRequest, getMovieDetailsRequest, updateMovieRequest } from 'src/app/core/store/actions/movies.actions';
import { State } from 'src/app/core/store/reducers';
import { getMovieDetailsSelector } from 'src/app/core/store/reducers/movies.reducer';
import { Movie } from 'src/app/shared/models/Movie';
import { MoviePhoto } from '../../../../shared/models/MoviePhoto';
import { Pattern } from '../../../../shared/constants/RegexPattern';

@Component({
  selector: 'app-movie-managing-panel',
  templateUrl: './movie-managing-panel.component.html',
  styleUrls: ['./movie-managing-panel.component.scss'],
})
export class MovieManagingPanelComponent implements OnInit {
  movieManagingForm: FormGroup;
  movieManagingPanelTitle: string;
  galleryPhotos: { uuid: string; file: MoviePhoto }[] = [];
  coverPhoto: { uuid: string; file: MoviePhoto };

  constructor(private store: Store<State>, private currentRoute: ActivatedRoute, private formBuilder: FormBuilder) {}

  ngOnInit() {
    const { movieId } = this.currentRoute.snapshot.params;
    this.movieManagingPanelTitle = movieId ? 'movie.managing.panel.edit' : 'movie.managing.panel.add';
    if (movieId) {
      this.store.dispatch(getMovieDetailsRequest({ payload: { movieId: +movieId } }));
      this.store.select(getMovieDetailsSelector).subscribe((movieDetails: Movie) => {
        this.createForm(movieDetails);
      });
    } else this.createForm();
  }

  createForm(movieDetails?: Movie) {
    this.movieManagingForm = this.formBuilder.group({
      title: [(movieDetails && movieDetails.title) || '', Validators.required],
      genre: [(movieDetails && movieDetails.genre) || '', Validators.required],
      production: [(movieDetails && movieDetails.production) || '', Validators.required],
      director: [(movieDetails && movieDetails.director) || '', Validators.required],
      duration: [(movieDetails && movieDetails.duration) || '', [Validators.required, Validators.pattern(Pattern.commaNotationNumber)]],
      adult: [(movieDetails && movieDetails.adult) || false, Validators.required],
      originalLanguage: [(movieDetails && movieDetails.originalLanguage) || '', Validators.required],
      subtitles: [(movieDetails && movieDetails.subtitles) || '', Validators.required],
      releaseDate: [(movieDetails && movieDetails.releaseDate) || '', Validators.required],
      overview: [(movieDetails && movieDetails.overview) || '', Validators.required],
      trailer: [(movieDetails && movieDetails.trailer) || '', [Validators.required, Validators.pattern(Pattern.link)]],
      coverPhoto: [(movieDetails && movieDetails.coverPhoto) || null, Validators.required],
      gallery: [(movieDetails && movieDetails.gallery) || []],
    });
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

  coverPhotoChange(photos) {
    this.coverPhoto = {
      uuid: String(new Date().getTime()),
      file: photos[0],
    };

    this.movieManagingForm.get('coverPhoto').setValue(this.coverPhoto.file);
  }

  saveChanges() {
    const { movieId } = this.currentRoute.snapshot.params;
    const movie = this.movieManagingForm.value;
    const payload = { movie: { ...movie, id: movieId }, uploadPhotos: this.galleryPhotos, coverPhoto: this.coverPhoto };
    if (movieId) {
      this.store.dispatch(updateMovieRequest({ payload }));
    } else {
      this.store.dispatch(addMovieRequest({ payload }));
    }
  }
}
