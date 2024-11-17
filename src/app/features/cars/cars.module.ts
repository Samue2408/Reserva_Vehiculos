import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { SkeletonModule } from 'primeng/skeleton';


@NgModule({
  declarations: [
    CarsComponent,
    CarDetailComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    FontAwesomeModule,
    SkeletonModule


  ]
})
export class CarsModule { }
