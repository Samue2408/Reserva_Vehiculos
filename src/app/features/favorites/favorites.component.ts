import { Component, OnInit } from '@angular/core';
import { CarService } from '../../core/services/cars.service';
import { Router } from '@angular/router';
import { faCartShopping, faHeart, faRetweet, faWandSparkles } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {

  constructor(public carsService: CarService, private router: Router){

  }

  cars: any;
  loadingCars: boolean = true;

  //icons
  faHeart = faHeart;
  faShopping = faCartShopping;
  faRetwet = faRetweet;
  faWandSparkles = faWandSparkles;


  ngOnInit(): void {
    this.loadingCars = true; 
    if (this.carsService?.favorites.length > 0) {
      this.loadingCars = false; 
    } else {
      setTimeout(() => {
        this.loadingCars = false;
      }, 1000); 
    }
  }
  

}
