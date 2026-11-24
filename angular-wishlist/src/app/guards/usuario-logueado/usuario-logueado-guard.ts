import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '../../services/auth';

export const usuarioLogueadoGuard: CanActivateFn = () => {
  return inject(Auth).isLoggedIn();
};