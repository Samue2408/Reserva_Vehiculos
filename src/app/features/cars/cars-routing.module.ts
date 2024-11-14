import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars.component';
import { CarDetailComponent } from './car-detail/car-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CarsComponent,
    children: [
      {
        path: 'carDetail/:id',
        component: CarDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsRoutingModule {}
