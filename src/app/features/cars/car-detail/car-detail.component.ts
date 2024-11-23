import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../core/services/cars.service';
import { faChevronLeft, faRetweet, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import { BookingsService } from '../../../core/services/bookings.service';
import dayGridPlugin from '@fullcalendar/daygrid'; 


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
  faArrowLeft = faChevronLeft

  showModal: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public carService: CarService,
    public bookingService: BookingsService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.car = this.carService.getSelectedCar(); 
    const license_plate = this.car.license_plate.slice(0, 3) + this.car.license_plate.slice(4);
    this.bookingService.dateCarBusy(license_plate).subscribe({
      next: (response) => {
        if (response?.data) { // Asegúrate de que la propiedad "data" existe
          this.events = response.data.map((element: any) => {
            return {
              title: 'reservado', // Título para cada evento
              start: element['start_date'].slice(0,10), // Fecha de inicio
              end: element['end_date'] // Fecha final
            };
          });
          this.calendarOptions.events = this.events;
          console.log(this.events)
        } else {
          console.error('El objeto de respuesta no contiene un array válido en "data".');
          this.events = []; // Asignar un array vacío si no hay datos
        }
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  rentCar(){
    this.router.navigate(['/rent'])
  }

  events: any[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: this.events,
    eventColor: '#a70707',
    headerToolbar: {
      left: 'today',
      center: 'title',
      right: 'prev,next',
    },
    buttonText: {
      prev: '◀', // Icono para el botón "anterior"
      next: '▶', // Icono para el botón "siguiente"
    },
    themeSystem: 'standart', // Usa el sistema de temas estándar de FullCalendar
  };

}
