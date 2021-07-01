import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CinemaRoutingModule } from './cinema-routing.module';
import { MoviesComponent } from './cinema-movies/movies.component';
import { MoviesFilterComponent } from './cinema-movies/movies-filter/movies-filter.component';
import { MovieDurationPipe } from 'src/app/shared/pipes/movie-duration/movie-duration.pipe';
import { MovieRatingAveragePipe } from 'src/app/shared/pipes/movie-rating-average/movie-rating-average.pipe';
import { RemoveMovieDialogComponent } from './cinema-movies/remove-movie-dialog/remove-movie-dialog.component';
import { MovieManagingPanelComponent } from './cinema-movies/movie-managing-panel/movie-managing-panel.component';
import { MovieScreeningsDialogComponent } from './cinema-movies/movie-screenings-dialog/movie-screenings-dialog.component';
import { CinemaAuditoriumComponent } from './cinema-auditorium/cinema-auditorium.component';
import { CinemaComponent } from './cinema.component';
import { MovieTrailerDialogComponent } from './cinema-movies/movie-trailer-dialog/movie-trailer-dialog.component';
import { ToolbarMenuTabComponent } from './toolbar-menu-tab/toolbar-menu-tab.component';
import { CinemaAccessGuard } from 'src/app/shared/guards/cinema-access-guard/cinema-access.guard';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { MoviesResolver } from 'src/app/core/resolvers/MoviesResolver';
import { MovieDetailsResolver } from 'src/app/core/resolvers/MovieDetailsResolver';
import { ReservationsResolver } from 'src/app/core/resolvers/ReservationsResolver';
import { AuditoriumResolver } from 'src/app/core/resolvers/AuditoriumResolver';
import { MoviesCardsListComponent } from './cinema-movies/movies-cards-list/movies-cards-list.component';
import { MovieDetailsFormComponent } from './cinema-movies/movie-managing-panel/movie-details-form/movie-details-form.component';
import { MoviesListComponent } from './cinema-movies/movie-managing-panel/movies-list/movies-list.component';
import { MovieDetailsComponent } from './cinema-movies/movie-details/movie-details.component';
import { CancelReservationDialogComponent } from './user-reservations/cancel-reservation-dialog/cancel-reservation-dialog.component';

@NgModule({
  declarations: [
    CinemaComponent,
    MoviesComponent,
    MoviesCardsListComponent,
    MoviesFilterComponent,
    MovieDetailsComponent,
    MovieRatingAveragePipe,
    MovieDurationPipe,
    RemoveMovieDialogComponent,
    MovieManagingPanelComponent,
    MovieScreeningsDialogComponent,
    CinemaAuditoriumComponent,
    MovieTrailerDialogComponent,
    ToolbarMenuTabComponent,
    UserReservationsComponent,
    MoviesListComponent,
    MovieDetailsFormComponent,
    CancelReservationDialogComponent,
  ],
  imports: [CinemaRoutingModule, SharedModule],
  entryComponents: [
    RemoveMovieDialogComponent,
    MovieScreeningsDialogComponent,
    MovieTrailerDialogComponent,
    CancelReservationDialogComponent,
  ],
  providers: [CinemaAccessGuard, MoviesResolver, MovieDetailsResolver, ReservationsResolver, AuditoriumResolver],
})
export class CinemaModule {}
