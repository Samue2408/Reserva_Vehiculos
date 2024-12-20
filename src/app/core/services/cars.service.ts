import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Car {
  license_plate: string;      // Placa del vehículo (VARCHAR(6))
  brand: string;              // Marca del vehículo (VARCHAR(30))
  model: string;              // Modelo del vehículo (VARCHAR(30))
  car_year: number;           // Año del vehículo (YEAR)
  mileage: number;            // Kilometraje del vehículo (INT)
  car_type: 'Sedan' | 'SUV' | 'Moto' | 'Camion' | 'Camioneta'; // Tipo de vehículo (ENUM)
  daily_fee: number;          // Tarifa diaria (DECIMAL(10, 2))
  seats: number;              // Número de asientos (INT)
  image_path: string;         // Ruta de la imagen (VARCHAR(255))
  transmission: string;       // Transmisión del auto (VARCHAR(255))
  available?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class CarService {
  private myAppUrl: string;
  private myApiUrl: string;
  private selectedCar: any;
  public cars: Car[] = [];
  public favorites: Car[] = [];


  setSelectedCar(car: any): void {
    this.selectedCar = car;
  }

  getSelectedCar(): any {
    return this.selectedCar;
  }
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cars/';
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  availableCar(carData: { start: string, end: string, license_plate: string} ): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}available`, carData);
  }
}
