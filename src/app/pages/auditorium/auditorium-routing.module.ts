import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditoriumComponent } from './auditorium.component';
import { AuditoriumResolver } from '../../core/resolvers/AuditoriumResolver';
import { ScreeningResolver } from '../../core/resolvers/ScreeningResolver';
import { ReservationsResolver } from '../../core/resolvers/ReservationsResolver';

const routes: Routes = [
  {
    path: ':auditoriumId/screening/:screeningId',
    component: AuditoriumComponent,
    resolve: { AuditoriumResolver, ScreeningResolver, ReservationsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditoriumRoutingModule {}
