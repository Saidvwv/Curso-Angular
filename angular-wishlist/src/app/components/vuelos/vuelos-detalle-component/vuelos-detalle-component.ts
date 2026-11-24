import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-vuelos-detalle-component',
  styleUrl: './vuelos-detalle-component.css',
  templateUrl: './vuelos-detalle-component.html',
})
export class VuelosDetalleComponent {
  id = inject(ActivatedRoute).snapshot.paramMap.get('id');
}