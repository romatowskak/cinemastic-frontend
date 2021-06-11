import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CinemaRoutingModule } from './cinema-routing.module';
import { CinemaHomeComponent } from './cinema-home/cinema-home.component';
import { SignInComponent } from './cinema-auth/sign-in/sign-in.component';
import { MoviesListComponent } from './cinema-movies/movies-list/movies-list.component';
import { MoviesComponent } from './cinema-movies/movies.component';
import { MoviesFilterComponent } from './cinema-movies/movies-filter/movies-filter.component';
import { MovieDetailsComponent } from './cinema-movies/movies-list/movie-details/movie-details.component';
import { MovieDurationPipe } from 'src/app/shared/pipes/movie-duration/movie-duration.pipe';
import { MovieRatingAveragePipe } from 'src/app/shared/pipes/movie-rating-average/movie-rating-average.pipe';

@NgModule({
  declarations: [
    CinemaHomeComponent,
    SignInComponent,
    MoviesComponent,
    MoviesListComponent,
    MoviesFilterComponent,
    MovieDetailsComponent,
    MovieRatingAveragePipe,
    MovieDurationPipe,
  ],
  imports: [CinemaRoutingModule, SharedModule],
})
export class CinemaModule {}
