import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule, NgForm } from '@angular/forms';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { FormFieldModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule } from '@progress/kendo-angular-icons';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    CarsComponent,
    CarDetailComponent,
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    FontAwesomeModule,
    SkeletonModule,
    FormsModule,
    IntlModule,
    DateInputsModule,
    LabelModule,
    FormFieldModule,
    ButtonsModule,
    IconsModule,
    FullCalendarModule


  ]
})
export class CarsModule { }
