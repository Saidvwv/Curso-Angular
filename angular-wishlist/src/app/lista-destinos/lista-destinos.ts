import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import { DestinoViajeModel } from '../models/destino-viaje.model';

@Component({
  imports: [NgFor, DestinoViaje, FormDestinoViaje],
  selector: 'app-lista-destinos',
  styleUrl: './lista-destinos.css',
  templateUrl: './lista-destinos.html',
})
export class ListaDestinos {
  destinos: DestinoViajeModel[] = [];

  agregado(d: DestinoViajeModel) {
    this.destinos.push(d);
  }

  elegido(d: DestinoViajeModel) {
    this.destinos.forEach(x => x.setSelected(false));
    d.setSelected(true);
  }
}