import { Component, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Login } from './components/login/login';
import { Observable } from 'rxjs';

@Component({
  imports: [RouterOutlet, RouterLink, AsyncPipe, Login],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-wishlist');
  time = new Observable<string>((observer) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}