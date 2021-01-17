import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { DateRangePickerComponent } from './date-range-picker.component';
import { DateRangePickerDirective } from './date-range-picker.directive';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatNativeDateModule
  ],
  declarations: [
    DateRangePickerComponent,
    DateRangePickerDirective
  ],
  exports: [DateRangePickerDirective],
  entryComponents: [DateRangePickerComponent]
})
export class DateRangePickerModule { }
