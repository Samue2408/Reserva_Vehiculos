import { Component, OnInit } from '@angular/core';
import { CarService } from '../../core/services/cars.service';
import {
  faCartShopping,
  faFilter,
  faHeart,
  faRetweet,
  faXmark,
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
  showModalRent: boolean = false;
  selectedCarLicensePlate: string = '';
  selectedFilter: string = '';
  selectedBrand: string = '';
  selectedPrice: string = '';
  selectedType: string = '';
  filteredCars: any = [];

  //icons
  faHeart = faHeart;
  faShopping = faCartShopping;
  faRetwet = faRetweet;
  faWandSparkles = faWandSparkles;
  faX = faXmark;
  faFilter = faFilter;

  constructor(public carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.carService.getAllCars().subscribe({
      next: (response) => {
        this.carService.cars = response;
        this.filteredCars = response;
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
      car.license_plate =
        car.license_plate.slice(0, 3) + '•' + car.license_plate.slice(3);
    });
  }

  async showCarDetail(index: number, car: any) {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => card.classList.remove('motion'));

    const selectedCard = cards[index];
    await selectedCard?.classList.add('motion');

    this.carService.setSelectedCar(car);
    this.router.navigate([`/carDetail/${index}`]);
  }

  toggleFavorite(car: any, event: Event): void {
    event.stopPropagation();

    if (this.isFavorite(car)) {
      this.carService.favorites = this.carService.favorites.filter(
        (fav) => fav !== car
      );
    } else {
      this.carService.favorites.push(car);
    }
  }

  isFavorite(car: any): boolean {
    return this.carService.favorites.includes(car);
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Reserva realizada');
      form.reset();
    } else {
      console.log('No se hizo');
    }
  }

  openModalRent(e: Event, car: any): void {
    e.stopPropagation();
    this.selectedCarLicensePlate = car.license_plate;
    this.showModalRent = true;
  }

  cancelModal() {
    this.showModalRent = false;
  }
  applyFilter() {
    this.filteredCars = this.carService.cars; 

    if(this.selectedFilter === 'all'){
      this.filteredCars = this.carService.cars;
    }

    if (this.selectedFilter === 'brand' && this.selectedBrand) {
      this.filteredCars = this.filteredCars.filter(
        (car: any) => car.brand === this.selectedBrand
      );
    }

    if(this.selectedFilter === 'type' && this.selectedType){
      this.filteredCars = this.filteredCars.filter(
        (car: any)=> car.car_type === this.selectedType
      )
    }

    if (this.selectedFilter === 'price' && this.selectedPrice) {
      if (this.selectedPrice === 'low') {
        this.filteredCars = this.filteredCars.filter((car: any) => car.daily_fee < 50);
      } else if (this.selectedPrice === 'medium') {
        this.filteredCars = this.filteredCars.filter(
          (car: any) => car.daily_fee >= 50 && car.daily_fee < 100
        );
      } else if (this.selectedPrice === 'high') {
        this.filteredCars = this.filteredCars.filter((car: any) => car.daily_fee >= 100);
      }
    }

    this.filteredCars = this.filteredCars; 
  }
}
