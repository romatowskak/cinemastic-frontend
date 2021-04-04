import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesHomeComponent } from './movies-home/movies-home.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
