import { NgModule } from '@angular/core';
import { MoviesCardsListComponent } from './movies-cards-list/movies-cards-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesFilterComponent } from './movies-filter/movies-filter.component';
import { MovieScreeningsDialogComponent } from './movie-screenings-dialog/movie-screenings-dialog.component';
import { MovieTrailerDialogComponent } from 'src/app/shared/components/movie-trailer-dialog/movie-trailer-dialog.component';
import { MovieDurationPipe } from 'src/app/shared/pipes/movie-duration/movie-duration.pipe';
import { MovieRatingAveragePipe } from 'src/app/shared/pipes/movie-rating-average/movie-rating-average.pipe';
import { MoviesResolver } from 'src/app/core/resolvers/MoviesResolver';
import { MovieDetailsResolver } from 'src/app/core/resolvers/MovieDetailsResolver';
import { CinemaAccessGuard } from 'src/app/core/guards/cinema-access-guard/cinema-access.guard';
import { MoviesRepertoirComponent } from './movies-repertoir/movies-repertoir.component';
import { MoviesComponent } from './movies.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  declarations: [
    MoviesComponent,
    MoviesRepertoirComponent,
    MoviesCardsListComponent,
    MoviesFilterComponent,
    MovieDetailsComponent,
    MovieScreeningsDialogComponent,
    MovieRatingAveragePipe,
    MovieDurationPipe,
    MovieTrailerDialogComponent,
  ],
  entryComponents: [MovieScreeningsDialogComponent, MovieTrailerDialogComponent],
  imports: [SharedModule, MoviesRoutingModule],
  providers: [CinemaAccessGuard, MoviesResolver, MovieDetailsResolver],
})
export class MoviesModule {}
