import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxGalleryModule } from 'ngx-gallery';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { AngularMaterialModule } from './angular-material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [FormFieldComponent, ToolbarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    TranslateModule,
    NgxPaginationModule,
    BarRatingModule,
    NgxGalleryModule,
  ],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    TranslateModule,
    CommonModule,
    NgxPaginationModule,
    BarRatingModule,
    NgxGalleryModule,
    FormFieldComponent,
    ToolbarComponent,
  ],
})
export class SharedModule {}
