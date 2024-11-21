import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../core/services/bookings.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {

  

  constructor(public bookingservice: BookingsService){
  }

  ngOnInit(): void {
    this.getAllBokings();
  }

  getAllBokings(): void {
    this.bookingservice.getBookings().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
