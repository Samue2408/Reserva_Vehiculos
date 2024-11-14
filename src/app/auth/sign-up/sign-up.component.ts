import { Component, OnInit } from '@angular/core';
import { faArrowRight, faEnvelope, faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  // Icons
  faArrow = faArrowRight;
  faEmail = faEnvelope;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faUser = faUser

  showPassword = false;

  fullName: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private _userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.fullName && this.email && this.password) {
      const userData = {
        c_name: this.fullName,
        email: this.email,
        password: this.password,
        role_id: 4
      };

      // Llama al método `addUser` del servicio para enviar los datos al backend
      this._userService.addUser(userData).subscribe({
        next: (response) => {
          console.log('Usuario registrado exitosamente', response);
          // Redirige a otra página después del registro exitoso
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error al registrar el usuario', err);
        }
      });
    }
  }
}
