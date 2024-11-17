import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { LeftMenuComponent } from './shared/components/left-menu/left-menu.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CarsComponent } from './features/cars/cars.component';
import { BookingComponent } from './features/booking/booking.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { CustomersComponent } from './features/customers/customers.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ButtonItemComponent } from './shared/components/button-item/button-item.component';
import { CardComponent } from './shared/components/card/card.component';
import { SettingsComponent } from './features/settings/settings.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ModalBookingComponent } from './shared/components/modal-booking/modal-booking.component';
import { FormsModule } from '@angular/forms';
import { AnimatedBackgroundComponent } from './shared/components/animated-background/animated-background.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavBarComponent,
    LeftMenuComponent,
    DashboardComponent,
    BookingComponent,
    FavoritesComponent,
    CustomersComponent,
    ButtonItemComponent,
    CardComponent,
    SettingsComponent,
    LoginComponent,
    SignUpComponent,
    ModalBookingComponent,
    AnimatedBackgroundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
