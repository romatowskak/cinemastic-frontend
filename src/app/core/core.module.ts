import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { localStorageSyncReducer } from './store/reducers/local-storage-meta.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as Sentry from '@sentry/angular';
import { Router } from '@angular/router';
import { SentryLogsHandler } from './sentry/sentry-logs-handler';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(reducers, { metaReducers: [localStorageSyncReducer] }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument(),
  ],
  exports: [],
  providers: [
    {
      provide: ErrorHandler,
      useClass: SentryLogsHandler,
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
})
export class CoreModule {}
