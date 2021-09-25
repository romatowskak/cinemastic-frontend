import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesResolver } from '../../core/resolvers/MoviesResolver';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesRepertoirComponent } from './movies-repertoir/movies-repertoir.component';
import { MoviesComponent } from './movies.component';
import { MovieDetailsResolver } from '../../core/resolvers/MovieDetailsResolver';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: '',
        component: MoviesRepertoirComponent,
        resolve: { MoviesResolver },
      },
      {
        path: ':movieId',
        component: MovieDetailsComponent,
        resolve: { MovieDetailsResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
