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
import { UsersService } from '../../../core/services/users.service';
import { response } from 'express';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent  {

  // icons
  faList = faList
  faCarRear = faCarRear
  faBagShooping = faBagShopping
  faHeart = faHeart
  faHouseChimneyWindow = faHouseChimneyWindow
  faUser = faUser
  faGear = faGear
  faArrowRightFromBracket = faArrowRightFromBracket

  constructor(private router: Router, private _userSevice: UsersService){
  }

  logOut(){

    // this.router.navigate(['/log-out']);
    
    this._userSevice.logoutUser().subscribe({
      next: (response) => {
        console.log(response.message); // Muestra mensaje de éxito
        localStorage.removeItem("Token");
        this.router.navigate(['/login']);
        
      },
      error: (e) => {
        console.log("Error al desloguearse", e)
      }
    })
    
    // setTimeout(() => {
    // }, 4000);
  }

  // routes
 
  buttons = [
    { route: '/main/dashboard', icon: faList, name: 'Dashboard', roles: ['1', '2'] },
    { route: '/main/cars', icon: faCarRear, name: 'Cars', roles: ['1', '2', '3', '4'] },
    { route: '/main/booking', icon: faBagShopping, name: 'Bookings', roles: ['1', '2', '3', '4'] },
    { route: '/main/favorites', icon: faHeart, name: 'Favorites', roles: ['4'] },
    { route: '/main/customers', icon: faUser, name: 'Customers', roles: ['1', '2'] },
    { route: '/main/settings', icon: faGear, name: 'Settings', roles: ['1', '2', '3', '4'] },
    { route: '', icon: faArrowRightFromBracket, name: 'Log Out', roles: ['1', '2', '3', '4'] }
  ];
  
  userRole: string = localStorage.getItem('role') || '';
  
  getFilteredButtons(): any[] {
    const buttonsFilterd = this.buttons.filter(button => button.roles.includes(this.userRole));
    return buttonsFilterd.slice(0,buttonsFilterd.length-2);
  }
  
}
