import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
  @Input() label: string;
  @Input() fieldType: 'input' | 'textarea' = 'input';
  @Input() set control(control: AbstractControl) {
    this.formControl = control;
  }
  formControl: AbstractControl;

  constructor() {}

  ngOnInit() {}
}
