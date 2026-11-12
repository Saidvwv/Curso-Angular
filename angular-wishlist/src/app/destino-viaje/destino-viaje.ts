import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DestinoViajeModel } from '../models/destino-viaje.model';

@Component({
  imports: [],
  selector: 'app-destino-viaje',
  styleUrl: './destino-viaje.css',
  templateUrl: './destino-viaje.html',
})
export class DestinoViaje {
  @Input() destino!: DestinoViajeModel;
  @HostBinding('class') cssClass = 'col-md-4 mb-4';
  @Output() clicked = new EventEmitter<DestinoViajeModel>();


  constructor() {
    this.clicked = new EventEmitter();
  }

  ir() {
    this.clicked.emit(this.destino);
    return false;
  }
}