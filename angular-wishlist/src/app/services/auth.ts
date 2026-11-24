import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Auth {
  login(user: string, password: string): boolean {
    if (user === 'user' && password === 'password') {
      localStorage.setItem('username', user);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('username');
  }

  getUser(): string | null {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}