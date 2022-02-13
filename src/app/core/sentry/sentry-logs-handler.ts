import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as Sentry from '@sentry/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Integrations } from '@sentry/tracing';

@Injectable()
export class SentryLogsHandler implements ErrorHandler {
  constructor() {
    Sentry.init({
      dsn: 'https://be0d72ffacb248419bab289886e26576@o1126175.ingest.sentry.io/6166899',
      release: 'dev',
      integrations: [
        new Integrations.BrowserTracing({
          tracingOrigins: ['localhost', 'https://yourserver.io/api'],
          routingInstrumentation: Sentry.routingInstrumentation,
        }),
      ],
      // tracesSampleRate: 1.0,
    });
  }

  handleError(error) {
    console.error('http error ', error);
    const thrownError = this.getError(error) || 'Unknown error';
    if (!environment.production) {
      Sentry.captureException(error?.originalError || thrownError);
    } else {
      console.error('error', error?.originalError || thrownError);
    }
  }

  getError(error) {
    if (typeof error === 'string' || error instanceof Error) {
      return error;
    }

    if (error instanceof HttpErrorResponse) {
      return `Server returned error with code ${error.status}, message ${error.message} and body "${error.error}"`;
    }
  }
}
