import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class permissionGuard implements CanActivate {
  constructor(private router: Router) {
    
  }

  canActivate(): boolean {

    if (localStorage.getItem('role') === '1' || localStorage.getItem('role') === '2') {      
      return true;
    };
    this.router.navigate(['/main/cars']);
    return false;
  }

}


/* export const permissionGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('Token') === '1' || localStorage.getItem('Token') === '2') {
    return true;
  }
  return false;
};
 */