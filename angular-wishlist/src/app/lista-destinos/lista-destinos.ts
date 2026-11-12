import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViajeModel } from '../models/destino-viaje.model';

@Component({
  imports: [NgFor, DestinoViaje],
  selector: 'app-lista-destinos',
  styleUrl: './lista-destinos.css',
  templateUrl: './lista-destinos.html',
})
export class ListaDestinos {
  destinos: DestinoViajeModel[] = [];

  guardar(nombre: string, url: string): boolean {
    this.destinos.push(new DestinoViajeModel(nombre, url));
    return false;
  }

elegido(d: DestinoViajeModel) {
  this.destinos.forEach(x => x.setSelected(false));
  d.setSelected(true);
}
}