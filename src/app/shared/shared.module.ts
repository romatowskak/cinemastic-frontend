import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialModule } from './angular-material.module';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { SentryErrorsComponent } from './components/sentry-errors/sentry-errors.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [FormFieldComponent, ToolbarComponent, SentryErrorsComponent],
  imports: [CommonModule, ReactiveFormsModule, AngularMaterialModule, TranslateModule, NgxPaginationModule, BarRatingModule],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    TranslateModule,
    CommonModule,
    NgxPaginationModule,
    BarRatingModule,
    FormFieldComponent,
    ToolbarComponent,
    SentryErrorsComponent,
  ],
})
export class SharedModule {}
