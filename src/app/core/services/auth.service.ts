import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myAppUrl: string;
  private myApiUrl: string;
  token: string | null = null;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users/';
  }



  isLoggedIn(): Observable<any> {
    
    
    this.token = localStorage.getItem('Token');
    
    if (this.token) {
      return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}validate-token`, { token: this.token })
    }    

    return new Observable(observer => {
      observer.next({ valid: false });
      observer.complete();
    });
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('Token');
    }
    
  }


  validateEmail(email: string): boolean{
    const regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
}
