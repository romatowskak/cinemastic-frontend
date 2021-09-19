import { NgModule } from '@angular/core';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { CancelReservationDialogComponent } from './cancel-reservation-dialog/cancel-reservation-dialog.component';
import { ReservationsComponent } from './reservations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationsResolver } from 'src/app/core/resolvers/ReservationsResolver';

@NgModule({
  declarations: [ReservationsComponent, CancelReservationDialogComponent],
  imports: [SharedModule, ReservationsRoutingModule],
  entryComponents: [CancelReservationDialogComponent],
  providers: [ReservationsResolver],
})
export class ReservationsModule {}
