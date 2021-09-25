import { NgModule, Injectable } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@Injectable()
@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, CoreModule, SharedModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
