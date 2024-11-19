import { NgIf } from '@angular/common';
import { Component, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-modal-booking',
  templateUrl: './modal-booking.component.html',
  styleUrl: './modal-booking.component.scss',
})
export class ModalBookingComponent {
  @Output() close = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();

  formData = {
    l_plate: '',
    start_date: '',
    end_date: '',
    total_cost: null,
  };

  closeModal() {
    this.close.emit;
  }

  onSubmit(bookingForm: any) {
    if (bookingForm.valid) {
      this.save.emit(this.formData);
    }
  }
}
