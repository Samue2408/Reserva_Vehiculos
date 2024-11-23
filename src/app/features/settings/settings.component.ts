import { Component, OnInit } from '@angular/core';
import { faArrowRight, faEnvelope, faExclamationTriangle, faEye, faEyeSlash, faHome, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {

  user: any;

  constructor() {}

  // Icons
  faArrow = faArrowRight;
  faEmail = faEnvelope;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faWarning = faExclamationTriangle;
  faHome = faHome
  faPhone = faPhone
  faUser = faUser

  ngOnInit(): void {
   const userString = localStorage.getItem('user')
     
   this.user = JSON.parse(userString || "")    
   console.log(this.user) 

   
   this.user.avatar = this.user.name.charAt(0);   

   this.user = {... this.user}

  }

  getProfile() {}
}
