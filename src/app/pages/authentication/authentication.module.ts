import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [AuthenticationRoutingModule, SharedModule],
})
export class AuthenticationModule {}
