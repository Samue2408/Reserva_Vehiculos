import { Component, OnInit } from '@angular/core';
import { CarService } from '../../core/services/cars.service';
import {
  faCartShopping,
  faHeart,
  faRetweet,
} from '@fortawesome/free-solid-svg-icons';
import { faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss',
})
export class CarsComponent implements OnInit {
  cars: any;
  loadingCars: boolean = true;
  favorites: any[] = [];

  //icons
  faHeart = faHeart;
  faShopping = faCartShopping;
  faRetwet = faRetweet;
  faWandSparkles = faWandSparkles;

  constructor(private carsService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.carsService.getAllCars().subscribe({
      next: (response) => {
        this.cars = response;
        this.loadingCars = false;
        this.incluidePointLicense(response);
      },
      error: (err) => {
        this.loadingCars = false;
      },
    });
  }

  incluidePointLicense(response: any) {
    response.map((car: any) => {
      car.license_plate = car.license_plate.slice(0, 3) + '•' + car.license_plate.slice(3);
    });
  }



  async showCarDetail(index: number, car: any) {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => card.classList.remove('motion'));

    const selectedCard = cards[index];
    await selectedCard?.classList.add('motion');

    this.carsService.setSelectedCar(car);
    this.router.navigate([`/carDetail/${index}`]);
  }

  toggleFavorite(car: any, event: Event): void {
    event.stopPropagation();
    console.log(this.favorites);

    if (this.isFavorite(car)) {
      this.favorites = this.favorites.filter((fav) => fav !== car);
    } else {
      this.favorites.push(car);
    }
  }

  isFavorite(car: any): boolean {
    return this.favorites.includes(car);
  }
}
