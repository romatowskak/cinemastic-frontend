import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CinemaAccessGuard } from './core/guards/cinema-access-guard/cinema-access.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'start',
        loadChildren: () => import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
        data: { animationState: 'Start' },
      },
      {
        path: 'movies',
        canActivateChild: [CinemaAccessGuard],
        loadChildren: () => import('./pages/movies/movies.module').then((m) => m.MoviesModule),
        data: { animationState: 'Movies' },
      },
      {
        path: 'auditorium',
        canActivateChild: [CinemaAccessGuard],
        loadChildren: () => import('./pages/auditorium/auditorium.module').then((m) => m.AuditoriumModule),
        data: { animationState: 'Auditorium' },
      },
      {
        path: 'reservations',
        canActivateChild: [CinemaAccessGuard],
        loadChildren: () => import('./pages/reservations/reservations.module').then((m) => m.ReservationsModule),
        data: { animationState: 'Reservations' },
      },
      {
        path: 'management',
        canActivateChild: [CinemaAccessGuard],
        loadChildren: () => import('./pages/movie-management/movie-management.module').then((m) => m.MovieManagementModule),
        data: { animationState: 'Management' },
      },
      { path: '**', redirectTo: '/movies' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
