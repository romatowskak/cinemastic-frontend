import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getMovieDetailsRequest, addRatingRequest, updateRatingRequest } from 'src/app/core/store/actions/movies.actions';
import { State } from 'src/app/core/store/reducers';
import { getMovieDetailsSelector } from 'src/app/core/store/reducers/movies.reducer';
import { Movie } from 'src/app/shared/models/Movie';
import { environment } from 'src/environments/environment';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { MoviePhoto } from '../../../../../shared/models/MoviePhoto';
import { User } from 'src/app/shared/models/User';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';
import { MovieRating } from 'src/app/shared/models/MovieRating';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieDetails: Movie;
  user: User;
  apiUrl = environment.apiUrl;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryPhotos: NgxGalleryImage[] = [];
  currentUserRating: MovieRating;

  constructor(private store: Store<State>, private currentRoute: ActivatedRoute) {}

  ngOnInit() {
    this.store.select(getSignedInUserSelector).subscribe((user: User) => {
      this.user = user;
    });

    const { movieId } = this.currentRoute.snapshot.params;
    this.store.dispatch(getMovieDetailsRequest({ payload: { movieId: +movieId } }));
    this.store.select(getMovieDetailsSelector).subscribe((movieDetails: Movie) => {
      this.movieDetails = movieDetails;

      this.currentUserRating = movieDetails && movieDetails.ratings.find((rating: MovieRating) => rating.user === this.user.user.id);

      this.galleryOptions = [
        { image: false, thumbnailsRemainingCount: true, height: '250px', width: '1500px' },
        { breakpoint: 500, width: '100%', thumbnailsColumns: 2 },
      ];

      this.galleryPhotos =
        movieDetails && movieDetails.gallery.length
          ? movieDetails.gallery.map((photo: MoviePhoto) => {
              return { small: `${this.apiUrl}${photo.url}`, medium: `${this.apiUrl}${photo.url}`, big: `${this.apiUrl}${photo.url}` };
            })
          : [];
    });
  }

  rateMovie(value: number) {
    if (this.currentUserRating) {
      this.store.dispatch(updateRatingRequest({ payload: { ...this.currentUserRating, value } }));
    } else {
      this.store.dispatch(addRatingRequest({ payload: { value, movie: this.movieDetails } }));
    }
  }
}
