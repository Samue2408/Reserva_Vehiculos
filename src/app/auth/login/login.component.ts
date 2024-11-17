import { Component, OnInit } from '@angular/core';
import { faArrowRight, faEnvelope, faExclamationTriangle, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorCredentials: boolean = false;
  emptyFields!: boolean;

  // Icons
  faArrow = faArrowRight;
  faEmail = faEnvelope;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faWarning = faExclamationTriangle


  showPassword = false;

  constructor(
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  onSubmit(): void {
    if (this.email && this.password) {
      const userData = { email: this.email, password: this.password };

      this.userService.loginUser(userData).subscribe({
        next: (response) => {
          localStorage.setItem("Token", response.token)
          console.log('Inicio de sesion Exitoso', response);
          this.router.navigate(['/main/dashboard']);
        },
        error: (err) => {
          this.errorCredentials = true;
          console.error('credenciales invalidas', err);
        }
      });
    } else {
      this.errorCredentials = false
    }

    if(this.email === '' || this.password === ''){
      this.emptyFields = true
      setTimeout(() => {
          this.emptyFields = false;
      }, 4000);
    }
  }

  validateField(): boolean {
    if (!this.email || !this.password) {
      return this.errorCredentials = false
    }
    return true;
  }

}
