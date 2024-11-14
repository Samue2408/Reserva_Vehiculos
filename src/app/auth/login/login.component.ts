import { Component, OnInit } from '@angular/core';
import { faArrowRight, faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
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

  // Icons
  faArrow = faArrowRight;
  faEmail = faEnvelope;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

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
    // Verifica que los campos no estén vacíos
    if (this.email && this.password) {
      const userData = { email: this.email, password: this.password };

      // Llama al método `loginUser` del servicio con los datos del usuario
      this.userService.loginUser(userData).subscribe({
        next: (response) => {
          console.log('Inicio de sesion Exitoso', response);
          // Redirige a la página de inicio después del inicio de sesion
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('credenciales invalidas', err);
        }
      });
    }
  }

}
