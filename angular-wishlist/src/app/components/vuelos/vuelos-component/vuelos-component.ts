import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-vuelos-component',
  styleUrl: './vuelos-component.css',
  templateUrl: './vuelos-component.html',
})
export class VuelosComponent {}