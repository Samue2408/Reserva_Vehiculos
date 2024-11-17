import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../../core/services/cars.service';
import { faRetweet, faWandSparkles } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss'
})
export class CarDetailComponent implements OnInit {

  id!: any;
  car: any;
  
  //icons
  faRetwet = faRetweet;
  faWandSparkles = faWandSparkles;

  constructor(private route: ActivatedRoute, private carService: CarService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.car = this.carService.getSelectedCar(); 
  }

}
