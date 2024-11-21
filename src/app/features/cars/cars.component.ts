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
import { FavoritesService } from '../../core/services/favorites.service';

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

  constructor(
    public carService: CarService, 
    private router: Router,
    public favoriteService: FavoritesService) {

    }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.carService.getAllCars().subscribe({
      next: (response) => {
        // obitiene los carros de la bd y los guarda en el array del servicio
        this.filteredCars = response
        this.carService.cars = response
        // date actual
        const date = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`        

        // mapea el array de carros y les ponen si estan o no disponibles
        this.carService.cars.map((car)=> {
          this.carService.availableCar({start: date, end: date, license_plate: car.license_plate})
          .subscribe(isAvailable => {
            car.available = isAvailable[0]['is_available']
          });
        });

        this.incluidePointLicense(response);
                
        this.favoriteService.getFavorites(localStorage.getItem('Token') || '').subscribe(carsfav => {
          this.carService.favorites = carsfav
        });
        
        this.loadingCars = false;
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
    const license_plate = car.license_plate.slice(0, 3) + car.license_plate.slice(4);

    
    if (this.isFavorite(car)) {
      //elimina carro
      this.favoriteService.delFavorites(license_plate).subscribe((data) =>{
        console.log(data)
      })
      this.carService.favorites = this.carService.favorites.filter((fav) => fav['license_plate'] !== license_plate);
    } else { 
      console.log(car)
      // agrega carro    
      this.favoriteService.addFavorites({token: localStorage.getItem('Token') || '', licensePlate: license_plate})
      .subscribe({
        next: (data) => {
          const carFavNew = { ...car }; //El operador de propagación copia las propiedades del objeto original a un nuevo objeto.
          carFavNew['license_plate'] = license_plate;
          console.log(car)
          this.carService.favorites.push(carFavNew);
          
          console.log(data);          
        },
        error: (err) => {
          console.log(err);          
        }
      })
      
    }
  }

  isFavorite(car: any): boolean {
    const license_plate = car.license_plate.slice(0, 3) + car.license_plate.slice(4);
    
    return this.carService.favorites.some((carfav) => carfav['license_plate'] === license_plate);
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
