import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { addMovieRequest, getMovieDetailsRequest, updateMovieRequest } from 'src/app/core/store/actions/movies.actions';
import { State } from 'src/app/core/store/reducers';
import { getMovieDetailsSelector } from 'src/app/core/store/reducers/movies.reducer';
import { Movie } from 'src/app/shared/models/Movie';
import { MoviePhoto } from '../../../../shared/models/MoviePhoto';

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
    this.movieManagingPanelTitle = movieId ? 'movie.managing.panel.edit_movie' : 'movie.managing.panel.add_movie';
    if (movieId) {
      this.store.dispatch(getMovieDetailsRequest({ payload: { movieId: +movieId } }));
      this.store.select(getMovieDetailsSelector).subscribe((movieDetails: Movie) => {
        if (movieDetails) {
          this.createForm(movieDetails);
        }
      });
    } else this.createForm();
  }

  createForm(movieDetails?: Movie) {
    this.movieManagingForm = this.formBuilder.group({
      title: [(movieDetails && movieDetails.title) || '', Validators.required],
      genre: [(movieDetails && movieDetails.genre) || '', Validators.required],
      production: [(movieDetails && movieDetails.production) || '', Validators.required],
      director: [(movieDetails && movieDetails.director) || '', Validators.required],
      duration: [(movieDetails && movieDetails.duration) || '', Validators.required],
      adult: [(movieDetails && movieDetails.adult) || false, Validators.required],
      originalLanguage: [(movieDetails && movieDetails.originalLanguage) || '', Validators.required],
      subtitles: [(movieDetails && movieDetails.subtitles) || '', Validators.required],
      releaseDate: [(movieDetails && movieDetails.releaseDate) || '', Validators.required],
      overview: [(movieDetails && movieDetails.overview) || '', Validators.required],
      trailer: [(movieDetails && movieDetails.trailer) || '', Validators.required],
      coverPhoto: [(movieDetails && movieDetails.coverPhoto) || null],
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
  }

  coverPhotoChange(file) {
    this.coverPhoto = {
      uuid: String(new Date().getTime()),
      file,
    };
  }

  saveChanges() {
    const { movieId } = this.currentRoute.snapshot.params;
    const movie = this.movieManagingForm.value;
    const payload = { movie: { ...movie, id: movieId }, uploadPhotos: this.galleryPhotos };
    if (movieId) {
      this.store.dispatch(updateMovieRequest({ payload }));
    } else {
      this.store.dispatch(addMovieRequest({ payload }));
    }
  }
}
