import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {    
    return this.authService.isLoggedIn().pipe(
      map(response => {
        if (response.valid) {
          // Si el token es válido, permite el acceso
          return true;
        } else {
          // Si el token está expirado, elimina el token y redirige a login
          this.userService.logoutUser();
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(()=>{
        // Si ocurre un error en la validación (por ejemplo, token expirado), redirige a login
        this.userService.logoutUser();
        this.router.navigate(['/login']);
        return [false];
      })
    )
  }
}
