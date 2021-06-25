import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cinemastic',
        loadChildren: () => import('./pages/cinema/cinema.module').then((m) => m.CinemaModule),
      },
      { path: '**', redirectTo: '/cinemastic/movies' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
