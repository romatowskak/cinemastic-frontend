import { NgModule } from '@angular/core';
import { AuditoriumRoutingModule } from './auditorium-routing.module';
import { AuditoriumComponent } from './auditorium.component';
import { AuditoriumResolver } from 'src/app/core/resolvers/AuditoriumResolver';
import { ReservationsResolver } from 'src/app/core/resolvers/ReservationsResolver';
import { ScreeningResolver } from 'src/app/core/resolvers/ScreeningResolver';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AuditoriumComponent],
  imports: [SharedModule, AuditoriumRoutingModule],
  providers: [AuditoriumResolver, ScreeningResolver, ReservationsResolver],
})
export class AuditoriumModule {}
