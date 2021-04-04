import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'movies',
        loadChildren: () => import('./pages/movies/movies.module').then((m) => m.MoviesModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('./pages/contact/contact.module').then((m) => m.ContactModule),
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
