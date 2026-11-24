import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import { DestinoViajeModel } from '../../models/destino-viaje.model';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import type { AppState } from '../../app.config';

@Component({
  imports: [NgFor, DestinoViaje, FormDestinoViaje],
  selector: 'app-lista-destinos',
  styleUrl: './lista-destinos.css',
  templateUrl: './lista-destinos.html',
})
export class ListaDestinos {
  private destinosApiClient = inject(DestinosApiClient);
  private store = inject(Store<AppState>);
  updates: string[] = [];

  all = toSignal(
    this.store.select((state) => state.destinos.items),
    { initialValue: [] as DestinoViajeModel[] }
  );

  constructor() {
    this.store
      .select((state) => state.destinos.favorito)
      .pipe(takeUntilDestroyed())
      .subscribe((d) => {
        if (d != null) {
          this.updates.push('Se ha elegido a ' + d.nombre);
        }
      });
  }

  agregado(d: DestinoViajeModel) {
    this.destinosApiClient.add(d);
  }

  elegido(d: DestinoViajeModel) {
    this.destinosApiClient.elegir(d);
  }
}