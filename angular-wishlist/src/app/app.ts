import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaDestinos } from './lista-destinos/lista-destinos';

@Component({
  imports: [RouterOutlet, ListaDestinos],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-wishlist');
}