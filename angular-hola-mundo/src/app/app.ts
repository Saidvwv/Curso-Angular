import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Saludador } from './saludador/saludador';

@Component({
  imports: [RouterOutlet, Saludador],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-hola-mundo');
}