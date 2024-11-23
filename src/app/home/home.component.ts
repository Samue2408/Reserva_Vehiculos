import { Component, OnInit } from '@angular/core';
import {
  faCalendar,
  faCar,
  faClock,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { CarService } from '../core/services/cars.service';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  currentSlide = 0;

  constructor(public carService: CarService, public authService:AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCars();
  }

  //icons
  faCar = faCar;
  faMoney = faMoneyBill;
  faClock = faClock;
  faCalendar = faCalendar;

  brandings: any = [
    'https://1000marcas.net/wp-content/uploads/2020/01/Lamborghini-Logo.png',
    'https://cdn.iconscout.com/icon/free/png-256/free-toyota-3441648-2874417.png',
    'https://dbdzm869oupei.cloudfront.net/img/sticker/preview/4928.png',
    'https://marque-voiture.com/wp-content/uploads/2016/01/Nissan-Logo-2012.png',
    'https://www.pngplay.com/wp-content/uploads/13/BMW-Logo-PNG-Clipart-Background.png',
    'https://autolab.com.co/wp-content/uploads/2019/04/Marcas-08.png',
  ];

  cards: any = [
    {
      icon: this.faCar,
      title: 'Varied Fleet of Vehicles',
      description:
        'Our fleet includes cars of different sizes and types, from compacts ideal for urban trips to luxury vehicles for a premium experience. We offer options for all tastes and needs.',
    },
    {
      icon: this.faMoney,
      title: 'Transparent and Competitive Prices',
      description:
        'We offer affordable rates with no hidden fees. Our goal is to provide an affordable car rental experience without compromising on service or vehicle quality.',
    },
    {
      icon: this.faClock,
      title: 'Customer Support',
      description:
        'Our team is available 24 hours a day, 7 days a week to assist you with any questions or issues that may arise during your rental. We are always here to help.',
    },
    {
      icon: this.faCalendar,
      title: 'Quick and Easy Booking',
      description:
        'Reserve your vehicle in minutes through our online platform or via our app. Its easy, fast and secure, ensuring your rental experience is as seamless as possible.',
    },
  ];

  getAllCars(): void {
    this.carService.getAllCars().subscribe({
      next: (response) => {
        this.carService.cars = response.map((car) => ({
          ...car,
          available: false,
        }));
        const today = new Date().toISOString().split('T')[0];

        this.carService.cars.forEach((car) => {
          this.carService
            .availableCar({
              start: today,
              end: today,
              license_plate: car.license_plate,
            })
            .subscribe((isAvailable) => {
              car.available = isAvailable[0]?.is_available ?? false;
            });
        });
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
      },
    });
  }

  nextSlide(): void {
    if (this.carService.cars.length > 0) {
      this.currentSlide = (this.currentSlide + 1) % this.carService.cars.length;
    }
  }

  prevSlide(): void {
    if (this.carService.cars.length > 0) {
      this.currentSlide =
        (this.currentSlide - 1 + this.carService.cars.length) %
        this.carService.cars.length;
    }
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.carService.cars.length) {
      this.currentSlide = index;
    }
  }

  goToRent(){
    if(this.authService?.token){
      this.router.navigate(['/main']);
    }else{
      this.router.navigate(['/login']);
    }
  }
}
