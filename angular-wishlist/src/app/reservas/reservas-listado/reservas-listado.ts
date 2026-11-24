import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservasApiClient } from '../reservas-api-client';

@Component({
  imports: [RouterLink, NgFor],
  selector: 'app-reservas-listado',
  styleUrl: './reservas-listado.css',
  templateUrl: './reservas-listado.html',
})
export class ReservasListado {
  api = inject(ReservasApiClient);
}