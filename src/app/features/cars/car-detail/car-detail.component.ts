import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../core/services/cars.service';
import { faRetweet, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { CalendarOptions } from '@fullcalendar/core/index.js';

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

  showModal: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public carService: CarService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.car = this.carService.getSelectedCar(); 
  }

  rentCar(){
    this.router.navigate(['/rent'])
  }

  events = [
    {
      title: 'Reunión de equipo',
      start: '2024-11-22T09:00:00',
      end: '2024-11-22T10:00:00'
    },
    {
      title: 'Llamada con cliente',
      start: '2024-11-23T14:00:00',
      end: '2024-11-23T15:00:00'
    },
    {
      title: 'Taller de desarrollo',
      start: '2024-11-25T11:00:00',
      end: '2024-11-25T13:00:00'
    },
    {
      title: 'Presentación de proyecto',
      start: '2024-11-26T16:00:00',
      end: '2024-11-26T17:00:00'
    },
    {
      title: 'Comida de trabajo',
      start: '2024-11-28T13:00:00',
      end: '2024-11-28T14:00:00'
    }
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.events  
  };
  
  

}
