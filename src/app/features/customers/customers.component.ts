import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  constructor(public customerservice: UsersService) {}

  Customers: any[] = [];

  ngOnInit(): void {
    this.getAllBokings();
  }

  getAllBokings(): void {
    this.customerservice.getCustomers().subscribe({
      next: (data) => {
        data.forEach((customer: any) => {
          customer.avatar = customer.c_name.charAt(0);
        });
        this.Customers = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
