import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars.component';
import { BookingComponent } from '../booking/booking.component';

const routes: Routes = [
  {
    path: '',
    component: CarsComponent,
  },
  {
    path: 'rent',
    component: BookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsRoutingModule {}
