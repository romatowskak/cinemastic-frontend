import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getMovieDetailsRequest } from 'src/app/core/store/actions/movies.actions';
import { State } from 'src/app/core/store/reducers';
import { getMovieDetailsSelector } from 'src/app/core/store/reducers/movies.reducer';
import { Movie } from 'src/app/shared/models/Movie';
import { environment } from 'src/environments/environment';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { MoviePhoto } from '../../../../../shared/models/MoviePhoto';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieDetails: Movie;
  apiUrl = environment.apiUrl;
  galleryOptions: NgxGalleryOptions[];
  galleryPhotos: NgxGalleryImage[];

  constructor(private store: Store<State>, private currentRoute: ActivatedRoute) {}

  ngOnInit() {
    const { movieId } = this.currentRoute.snapshot.params;
    this.store.dispatch(getMovieDetailsRequest({ payload: { movieId: +movieId } }));
    this.store.select(getMovieDetailsSelector).subscribe((movieDetails: Movie) => {
      this.movieDetails = movieDetails;

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

  rateMovie(ratingValue: number) {}
}
