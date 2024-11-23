import { Component, OnInit } from '@angular/core';
import {
  faArrowRight,
  faEnvelope,
  faExclamationTriangle,
  faEye,
  faEyeSlash,
  faInfo,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  // Icons
  faArrow = faArrowRight;
  faEmail = faEnvelope;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faUser = faUser;
  faWarning = faExclamationTriangle;
  faInfo = faInfo;

  // Controllers
  showPassword = false;
  errorUser: boolean = false;
  strengthLevel: number = 0;
  messageSecure: string = '';
  showValidateControllers: boolean = false;
  validateEmailController: boolean = true;
  emptyFields: boolean = false;

  // Credentials
  fullName: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private _userService: UsersService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.fullName && this.email && this.password) {
      if (this.strengthLevel >= 5) {

        // Determinar el role_id basado en el dominio del correo electrónico
      let role_id = 4; // Valor por defecto

        if (/@RENTAGO\.EMP\.CO$/i.test(this.email)) {
          role_id = 3;
        } else if (/@RENTAGO\.MAN\.CO$/i.test(this.email)) {
          role_id = 2;
        } else if (/@RENTAGO\.ADMIN\.CO$/i.test(this.email)) {
          role_id = 1;
        }

        const userData = {
          c_name: this.fullName,
          email: this.email,
          password: this.password,
          role_id,
        };

        this._userService.addUser(userData).subscribe({
          next: (response) => {
            console.log('Usuario registrado exitosamente', response);
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.errorUser = true;
            console.error('Error al registrar el usuario', err);
          },
        });
      }else{
        return;
      }
    } else {
      this.emptyFields = true;
      setTimeout(() => {
        this.emptyFields = false;
      }, 4000);
    }
  }

  validateEmail(email: string) {
    if (!email) return (this.validateEmailController = true);
    return (this.validateEmailController =
      this.authService.validateEmail(email));
  }

  validateSecurePassword(password: string): void {
    this.showValidateControllers = true;
    if (!password) {
      this.strengthLevel = 0;
      this.showValidateControllers = false;
      return;
    }

    let level = 0;
    if (password.length >= 8) level++;
    if (/[A-Z]/.test(password)) level++;
    if (/[a-z]/.test(password)) level++;
    if (/\d/.test(password)) level++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) level++;

    this.strengthLevel = level;
  }

  getBarClass(index: number): string {
    const elements = document.querySelectorAll('.level');
    this.messageSecure = '';

    elements.forEach((element, i) => {
      element.classList.remove(
        'level-low-bg',
        'level-medium-bg',
        'level-high-bg'
      );
      if (i < this.strengthLevel) {
        if (this.strengthLevel < 3) {
          element.classList.add('level-low-bg');
          this.messageSecure = 'Contraseña muy insegura.';
        } else if (this.strengthLevel < 5) {
          element.classList.add('level-medium-bg');
          this.messageSecure = 'Contraseña moderadamente segura.';
        } else {
          element.classList.add('level-high-bg');
          this.messageSecure = 'Contraseña segura.';
        }
      }
    });

    if (index < this.strengthLevel) {
      if (this.strengthLevel < 3) return 'level-low-bg';
      if (this.strengthLevel < 5) return 'level-medium-bg';
      return 'level-high-bg';
    }
    return '';
  }
}
