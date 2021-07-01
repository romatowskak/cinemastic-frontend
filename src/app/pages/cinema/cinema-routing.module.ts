import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './cinema-movies/movies.component';
import { MovieManagingPanelComponent } from './cinema-movies/movie-managing-panel/movie-managing-panel.component';
import { CinemaAuditoriumComponent } from './cinema-auditorium/cinema-auditorium.component';
import { CinemaComponent } from './cinema.component';
import { CinemaAccessGuard } from 'src/app/shared/guards/cinema-access-guard/cinema-access.guard';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { MoviesResolver } from '../../core/resolvers/MoviesResolver';
import { MovieDetailsResolver } from '../../core/resolvers/MovieDetailsResolver';
import { ReservationsResolver } from '../../core/resolvers/ReservationsResolver';
import { AuditoriumResolver } from '../../core/resolvers/AuditoriumResolver';
import { MovieDetailsComponent } from './cinema-movies/movie-details/movie-details.component';

const routes: Routes = [
  {
    path: '',
    component: CinemaComponent,
    canActivateChild: [CinemaAccessGuard],
    children: [
      {
        path: 'movies',
        component: MoviesComponent,
        resolve: { MoviesResolver },
      },
      {
        path: 'movies/:movieId',
        component: MovieDetailsComponent,
        resolve: { MovieDetailsResolver },
      },
      {
        path: 'create',
        component: MovieManagingPanelComponent,
      },
      {
        path: 'edit/:movieId',
        component: MovieManagingPanelComponent,
      },
      {
        path: 'auditorium/:auditoriumId/screening/:screeningId',
        component: CinemaAuditoriumComponent,
        resolve: { AuditoriumResolver },
      },
      { path: 'reservations/:userId', component: UserReservationsComponent, resolve: { ReservationsResolver } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CinemaRoutingModule {}
