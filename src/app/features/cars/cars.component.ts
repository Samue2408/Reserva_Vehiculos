import { Component, OnInit } from '@angular/core';
import { CarService } from '../../core/services/cars.service';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent implements OnInit{
  cars: any

  constructor(private carsService: CarService, private router: Router){
    this.carsService.getAllCars().subscribe({    
      next: (response) => {
        this.cars = response
        console.log('Carros cargados', response);
      },
      error: (err) => {
        console.error('Carros no cargados', err);
      }  
    })
  }

  

  ngOnInit(): void {
    
  }

  //icons
  faRetwet = faRetweet
  faWandSparkles = faWandSparkles

  




  /* cars: any = [
    {
      name: 'Ford F-150',
      source: 'https://pictures.dealer.com/fd-DIG_IMAGES/9ac83d3974e29ab8982d21e1d97ffe82.png?w=640&impolicy=downsize_bkpt&imdensity=1',
      price: 120000000,
      gearbox: 'Manual',
      model: 2021
    },
    {
      name: 'BMW X5',
      source: 'https://larte-design.com/storage/app/media/kits/bmw/x5/colors/dravit-grey/bmw-x5-g05-body-kit-carbon-front-dravit-grey.webp',
      price: 180000000,
      gearbox: 'Manual',
      model: 2022
    },
    {
      name: 'Mazda CX-5',
      source: 'https://www.mazdaespanol.com/siteassets/vehicles/2025/m3h/07_trims/34-profiles/turbo-premium-plus/2025-mazda-3-hatchback-2.5-turbo-premium-plus?w=%7Bwidth%7D',
      price: 105000000,
      gearbox: 'Automatic',
      model: 2024
    },
    {
      name: 'Van | Mercedes-Benz',
      source: 'https://elitesprinters.com/wp-content/uploads/2022/08/executive-sprinter-1-2-1.png',
      price: 290000000,
      gearbox: 'Automatic',
      model: 2023
    },
    {
      name: 'Autobus',
      source: 'https://pngimg.com/d/bus_PNG101207.png',
      price: 300000000,
      gearbox: 'Manual',
      model: 2019
    },
    {
      name: 'Autobus',
      source: 'https://pngimg.com/d/bus_PNG101207.png',
      price: 300000000,
      gearbox: 'Manual',
      model: 2019
    },
    {
      name: 'Van | Mercedes-Benz',
      source: 'https://elitesprinters.com/wp-content/uploads/2022/08/executive-sprinter-1-2-1.png',
      price: 290000000,
      gearbox: 'Automatic',
      model: 2023
    },
    {
      name: 'Mazda CX-5',
      source: 'https://www.mazdaespanol.com/siteassets/vehicles/2025/m3h/07_trims/34-profiles/turbo-premium-plus/2025-mazda-3-hatchback-2.5-turbo-premium-plus?w=%7Bwidth%7D',
      price: 105000000,
      gearbox: 'Automatic',
      model: 2024
    },
    {
      name: 'Mazda CX-5',
      source: 'https://www.mazdaespanol.com/siteassets/vehicles/2025/m3h/07_trims/34-profiles/turbo-premium-plus/2025-mazda-3-hatchback-2.5-turbo-premium-plus?w=%7Bwidth%7D',
      price: 105000000,
      gearbox: 'Automatic',
      model: 2024
    },
  ] */

  showCarDetail(index: number){
    this.router.navigate([`/main/cars/carDetail/${index}`])
  }

}
