import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {    
    // Verifica el token en localStorage para determinar si el usuario está logueado
    if (typeof localStorage === 'undefined') { //PARA QUE NO SALGA EL ERROR EN LA CONSOLA DE QUE NO ESTA DEFINIDO PERO CARGA LA PANTALLA
      // Si `localStorage` no está disponible, devuelve `false` o maneja de otra manera
      return false;
    }
    const token = localStorage.getItem('Token');
    return !!token; // Devuelve true si el token existe
  }

  validateEmail(email: string): boolean{
    const regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
}
