import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sentry-errors',
  templateUrl: './sentry-errors.component.html',
  styleUrls: ['./sentry-errors.component.scss'],
})
export class SentryErrorsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onNotAFunctionError() {
    // const someArray = [{ func: () => {} }];
    // someArray[1].func();
  }

  onURIError() {
    // decodeURIComponent('%');
  }

  onSyntaxError() {
    eval('foo bar');
  }

  onRangeError() {
    throw new RangeError('Parameter must be between 1 and 100');
  }
}
