import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  imports: [],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  authService = inject(Auth);
  mensajeError = '';

  login(username: string, password: string) {
    this.mensajeError = '';
    if (!this.authService.login(username, password)) {
      this.mensajeError = 'Login incorrecto.';
      setTimeout(() => (this.mensajeError = ''), 2500);
    }
    return false;
  }

  logout() {
    this.authService.logout();
    return false;
  }
}