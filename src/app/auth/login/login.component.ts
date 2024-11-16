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
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorCredentials = true;
          console.error('credenciales invalidas', err);
        }
      });
    }
  }

}
