import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from '../pages/angular-material/angular-material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BarRatingModule } from 'ngx-bar-rating';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, AngularMaterialModule, TranslateModule, NgxPaginationModule, BarRatingModule],
  exports: [ReactiveFormsModule, AngularMaterialModule, TranslateModule, CommonModule, NgxPaginationModule, BarRatingModule],
})
export class SharedModule {}
