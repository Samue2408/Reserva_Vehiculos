import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faCarRear } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {

  // icons
  faList = faList
  faCarRear = faCarRear
  faBagShooping = faBagShopping
  faHeart = faHeart
  faHouseChimneyWindow = faHouseChimneyWindow
  faUser = faUser
  faGear = faGear
  faArrowRightFromBracket = faArrowRightFromBracket

  constructor(private router: Router){

  }

  logOut(){
    // this.router.navigate(['/log-out']);
    this.router.navigate(['/login'])
    // setTimeout(() => {
    // }, 4000);
  }

  // routes

  buttons: any = [
    {
      route: '/main/dashboard',
      icon: faList,
      name: 'Dashboard'
    },
    {
      route: '/main/cars',
      icon: faCarRear,
      name: 'Cars'
    },
    {
      route: '/main/booking',
      icon: faBagShopping,
      name: 'Booking'
    },
    {
      route: '/main/favorites',
      icon: faHeart,
      name: 'Favorites'
    },
    {
      route: '/main/customers',
      icon: faUser,
      name: 'Customers'
    },
    {
      route: '/main/settings',
      icon: faGear,
      name: 'Settings'
    },
    {
      route: '',
      icon: faArrowRightFromBracket,
      name: 'Log Out'
    }
  ]
  
}
