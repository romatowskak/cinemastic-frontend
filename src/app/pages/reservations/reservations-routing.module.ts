import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationsComponent } from './reservations.component';
import { ReservationsResolver } from '../../core/resolvers/ReservationsResolver';

const routes: Routes = [{ path: ':userId', component: ReservationsComponent, resolve: { ReservationsResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsRoutingModule {}
