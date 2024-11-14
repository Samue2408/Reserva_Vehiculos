import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

interface User {
  id?: number;
  c_name: string;
  address?: string;
  phone?: string;
  email: string ;
  password?: string; 
  role_id: number;  
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users/';
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  addUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  loginUser(user: { email: string; password: string }): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}login`, user);
  }
}
