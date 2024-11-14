import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Car {
  make: string;
  model: string;
  year: number;
  country: string;
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<Car[]> {
    return this.http.get<{ cars: Car[] }>('./api.json').pipe(
      map(response => response.cars), 
      catchError(error => {
        console.error('Error fetching car data:', error);
        return throwError(() => new Error('Error fetching car data'));
      })
    );
  }
}
