import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CinemaHomeComponent } from './cinema-home/cinema-home.component';
import { SignInComponent } from './cinema-auth/sign-in/sign-in.component';
import { MoviesComponent } from './cinema-movies/movies.component';
import { MovieDetailsComponent } from './cinema-movies/movies-list/movie-details/movie-details.component';
import { MovieManagingPanelComponent } from './cinema-movies/movie-managing-panel/movie-managing-panel.component';

const routes: Routes = [
  {
    path: '',
    component: CinemaHomeComponent,
    children: [
      {
        path: 'sign_in',
        component: SignInComponent,
      },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CinemaRoutingModule {}
