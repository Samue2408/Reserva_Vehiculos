import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CarsComponent } from './features/cars/cars.component';
import { BookingComponent } from './features/booking/booking.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { CustomersComponent } from './features/customers/customers.component';
import { SettingsComponent } from './features/settings/settings.component';
import { CarDetailComponent } from './features/cars/car-detail/car-detail.component';
import { LogOutComponent } from './auth/log-out/log-out.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'cars',
        loadChildren: ()=> import('./features/cars/cars.module').then(m=> m.CarsModule)
      },
      {
        path: 'booking',
        component: BookingComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
  {
    path: 'login',
    loadChildren: ()=> import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sign-up',
    loadChildren: ()=> import('./auth/sign-up/sign-up.module').then(m=>m.SignUpModule)
  },
  {
    path: 'log-out',
    component: LogOutComponent
  },
  {
    path: '**',
    redirectTo: 'main/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
