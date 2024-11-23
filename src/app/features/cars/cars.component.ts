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
import { BookingsService } from '../../core/services/bookings.service';

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
  selectedCarDailyFee: number = 0;
  selectedFilter: string = '';
  selectedBrand: string = '';
  selectedPrice: string = '';
  selectedType: string = '';
  filteredCars: any = [];
  endDate: string = '';
  startDate: string = '';
  minDate: string; 
  sucessRent: boolean = false;
  isRole4: boolean = false;

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
    public favoriteService: FavoritesService,
    public bookingService: BookingsService) {
      const today = new Date();
      this.minDate = today.toISOString().split('T')[0];
    }

  ngOnInit(): void {
    this.getAllCars();
    this.isRole4 = localStorage.getItem('role') === '4';
  }

  getAllCars() {
    this.carService.getAllCars().subscribe({
      next: (response) => {
        this.filteredCars = response
        this.carService.cars = response
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
        car.license_plate.slice(0, 3) + '-' + car.license_plate.slice(3);
    });
  }

  async showCarDetail(index: number, car: any) {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => card.classList.remove('motion'));

    const selectedCard = cards[index];
    await selectedCard?.classList.add('motion');

    this.carService.setSelectedCar(car);
    this.router.navigate([`/carDetail/${car.license_plate}`]);
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

  calcularDiasEntreFechas(inicio: Date, fin: Date): number {
    const diferencia = fin.getTime() - inicio.getTime(); // Diferencia en milisegundos
    const dias = diferencia / (1000 * 3600 * 24); // Convertir a días
    return Math.abs(dias) + 1;
  }

  costoTotal(): number {
    if (this.endDate && this.startDate) {
      const dias = this.calcularDiasEntreFechas(new Date(this.startDate), new Date(this.endDate));
      return dias * this.selectedCarDailyFee;
    }
    return 0; // Si no hay fechas seleccionadas, retornamos 0
  }

  async onSubmit(form: any) {
    if (form.valid) {
      const license_plate = this.selectedCarLicensePlate.slice(0, 3) + this.selectedCarLicensePlate.slice(4);
      this.bookingService.addBookings({d_start: this.startDate, 
        d_end: this.endDate, 
        id_car: license_plate, 
        token: localStorage.getItem('Token') || ''}).subscribe({
          next: (data) => {
            this.showModalRent = false;
            alert(`Auto ${license_plate} rentado!`)
          },
          error: (err) => {
            console.log('error', err)
          }
        })
      form.reset();
    } else {
      console.log('No se hizo');
    }
  }

  openModalRent(e: Event, car: any): void {
    e.stopPropagation();
    this.selectedCarLicensePlate = car.license_plate;
    this.selectedCarDailyFee = car.daily_fee;
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
