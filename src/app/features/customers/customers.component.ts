import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {

  constructor(public customerservice: UsersService){
  }

  ngOnInit(): void {
    this.getAllBokings();
  }

  getAllBokings(): void {
    this.customerservice.getCustomers().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  

}
