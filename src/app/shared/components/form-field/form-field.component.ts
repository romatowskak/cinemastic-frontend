import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorsDictionary } from '../../constants/ErrorsDictionary';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
  @Input() label: string;
  @Input() fieldType: 'input' | 'textarea' = 'input';
  @Input() control: AbstractControl;

  constructor() {}

  ngOnInit() {}

  validateField(keys) {
    const errorKeys = keys && Object.keys(keys);
    const patternErrors = keys && keys.pattern;

    return patternErrors
      ? ErrorsDictionary[patternErrors.requiredPattern]
      : errorKeys && errorKeys.length && ErrorsDictionary[errorKeys[0]];
  }
}
