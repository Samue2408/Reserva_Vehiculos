import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../core/services/bookings.service';
import { faCar, faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CarService } from '../../core/services/cars.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookings: any[] = [];

  constructor(
    public bookingservice: BookingsService,
    private router: Router,
    private carService: CarService
  ) {}

  //icons
  faCar = faCar
  faDelete = faTrash
  faEllipsis = faEllipsis

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings(): void {
    this.bookingservice.getBookings().subscribe({
      next: (data: any) => {
        this.bookings = [...data];
        
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getBookingClass(status: string): string {
    switch (status) {
      case 'Pendiente':
        return 'pending';
      case 'Activa':
        return 'active';
      case 'Completada':
        return 'completed';
      case 'Cancelada':
        return 'cancelled';
      default:
        return '';
    }
  }

}
