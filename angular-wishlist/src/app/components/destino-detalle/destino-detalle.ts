import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoViajeModel } from '../../models/destino-viaje.model';

@Component({
  imports: [],
  selector: 'app-destino-detalle',
  styleUrl: './destino-detalle.css',
  templateUrl: './destino-detalle.html',
})
export class DestinoDetalle implements OnInit {
  private route = inject(ActivatedRoute);
  destino: DestinoViajeModel | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // this.destinosApiClient.getById(id);
  }
}