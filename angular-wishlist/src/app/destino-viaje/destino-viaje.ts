import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, RouterOutlet, RouterLink],
  selector: 'app-destino-viaje',
  styleUrl: './destino-viaje.css',
  templateUrl: './destino-viaje.html',
  
})
export class DestinoViaje {
  @Input() destino!: DestinoViajeModel;
  @Input('idx') position!: number;
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