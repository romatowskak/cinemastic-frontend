import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MovieManagingPanelComponent } from './movie-managing-panel.component';
import { MoviesResolver } from '../../core/resolvers/MoviesResolver';
import { MovieDetailsResolver } from 'src/app/core/resolvers/MovieDetailsResolver';
import { MovieDetailsFormComponent } from './movie-details-form/movie-details-form.component';

const routes: Routes = [
  {
    path: '',
    component: MovieManagingPanelComponent,
    children: [
      {
        path: 'create',
        component: MovieDetailsFormComponent,
        resolve: { MoviesResolver },
      },
      {
        path: 'edit/:movieId',
        component: MovieDetailsFormComponent,
        resolve: { MoviesResolver, MovieDetailsResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieManagementRoutingModule {}
