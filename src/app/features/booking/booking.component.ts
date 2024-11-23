import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../core/services/bookings.service';
import {
  faCar,
  faEllipsis,
  faPencil,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CarService } from '../../core/services/cars.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookings: any[] = [];
  showEllipsisModal = false;
  modalPosition = { top: '0px', left: '0px' };
  selectedBookingId: string | null = null;
  isRole1: boolean = false;

  constructor(
    public bookingservice: BookingsService,
    private router: Router,
    private carService: CarService
  ) {}

  //icons
  faCar = faCar;
  faDelete = faTrash;
  faEllipsis = faEllipsis;
  faEdit = faPencil;
  faCancel = faXmark;

  ngOnInit(): void {
    this.getAllBookings();
    this.isRole1 = localStorage.getItem('role') === '1';
  }

  getAllBookings(): void {
    this.bookingservice.getBookings().subscribe({
      next: (data: any) => {
        this.bookings = [...data];
        console.log(this.bookings);
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

  showModal(event: MouseEvent, bookingId: string): void {
    const button = event.target as HTMLElement;
    const rect = button.getBoundingClientRect();
    this.modalPosition = {
      top: `${rect.top + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
    };
    this.selectedBookingId = bookingId;
    this.showEllipsisModal = true;
  }

  hideModal(): void {
    this.showEllipsisModal = false;
    this.selectedBookingId = null;
  }
}
