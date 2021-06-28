import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './cinema-movies/movies.component';
import { MovieDetailsComponent } from './cinema-movies/movies-list/movie-details/movie-details.component';
import { MovieManagingPanelComponent } from './cinema-movies/movie-managing-panel/movie-managing-panel.component';
import { CinemaAuditoriumComponent } from './cinema-auditorium/cinema-auditorium.component';
import { CinemaComponent } from './cinema.component';
import { CinemaAccessGuard } from 'src/app/shared/guards/cinema-access-guard/cinema-access.guard';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';

const routes: Routes = [
  {
    path: '',
    component: CinemaComponent,
    canActivateChild: [CinemaAccessGuard],
    children: [
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: 'movies/:movieId',
        component: MovieDetailsComponent,
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
      },
      { path: 'reservations/:userId', component: UserReservationsComponent },
      { path: '**', redirectTo: '/cinemastic/movies' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CinemaRoutingModule {}
