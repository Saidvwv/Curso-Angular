import { Component, EventEmitter, HostBinding, inject, Input, Output } from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { DestinoViajeModel } from '../../models/destino-viaje.model';
import { VoteDownAction, VoteUpAction } from '../../models/destinos-viajes-state.model';
import type { AppState } from '../../app.config';

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

  private store = inject(Store<AppState>);

  constructor() {
    this.clicked = new EventEmitter();
  }

  ir() {
    this.clicked.emit(this.destino);
    return false;
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }
}