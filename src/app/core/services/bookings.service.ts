import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Booking {
  id_booking: number;
  id_cliente: number;
  nombre: string;      
  start_date: string;            
  end_date: string;              
  brand: string;           
  model: string;            
  license_plate: string; 
  total_cost: number;
}

@Injectable({
  providedIn: 'root'
})

export class BookingsService {
  private myAppUrl: string;
  private myApiUrl: string;
  public booking: Booking[] = [];

  constructor( private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/bookings/';
  }

  getBookings(): Observable<Booking> {
    return this.http.get<Booking>(`${this.myAppUrl}${this.myApiUrl}${localStorage.getItem('Token')}`)
  }

  /* { d_start, d_end, id_car, token } */

  addBookings(booking: { d_start: string, d_end: string, id_car: string, token: string}): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, booking);
  }

}
