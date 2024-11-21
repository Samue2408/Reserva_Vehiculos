import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from './cars.service';

export interface FavoriteCar {
  favorite_id: number;        // Identificador único del registro (INT)
  user_id: number;            // ID del usuario que marcó como favorito (INT)
  license_plate: string;      // Placa del vehículo favorito (VARCHAR(6))
  added_date: Date;           // Fecha en que se agregó a favoritos (TIMESTAMP)
}

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/favoritesCars/';
  }

  getFavorites(token: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.myAppUrl}${this.myApiUrl}${token}`);
  }

  addFavorites(favorite: {token: string, licensePlate: string}): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, favorite);
  }

  delFavorites(licensePlate: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('Token')}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete<any>(`${this.myAppUrl}${this.myApiUrl}${licensePlate}`, {headers})
  }

}
