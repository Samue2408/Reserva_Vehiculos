import { Component } from '@angular/core';
import { faCalendar, faCar, faClock, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  //icons
  faCar = faCar
  faMoney = faMoneyBill
  faClock = faClock
  faCalendar = faCalendar

  brandings: any = [
    'https://1000marcas.net/wp-content/uploads/2020/01/Lamborghini-Logo.png',
    'https://cdn.iconscout.com/icon/free/png-256/free-toyota-3441648-2874417.png',
    'https://dbdzm869oupei.cloudfront.net/img/sticker/preview/4928.png',
    'https://marque-voiture.com/wp-content/uploads/2016/01/Nissan-Logo-2012.png',
    'https://www.pngplay.com/wp-content/uploads/13/BMW-Logo-PNG-Clipart-Background.png',
    'https://autolab.com.co/wp-content/uploads/2019/04/Marcas-08.png',
  ]

  cards: any = [
    {
      icon: this.faCar,
      title: 'Varied Fleet of Vehicles',
      description: 'Our fleet includes cars of different sizes and types, from compacts ideal for urban trips to luxury vehicles for a premium experience. We offer options for all tastes and needs.'
    },
    {
      icon: this.faMoney,
      title: 'Transparent and Competitive Prices',
      description: 'We offer affordable rates with no hidden fees. Our goal is to provide an affordable car rental experience without compromising on service or vehicle quality.'
    },
    {
      icon: this.faClock,
      title: 'Customer Support',
      description: 'Our team is available 24 hours a day, 7 days a week to assist you with any questions or issues that may arise during your rental. We are always here to help.'
    },
    {
      icon: this.faCalendar,
      title: 'Quick and Easy Booking',
      description: 'Reserve your vehicle in minutes through our online platform or via our app. Its easy, fast and secure, ensuring your rental experience is as seamless as possible.'
    }
  ]

}
