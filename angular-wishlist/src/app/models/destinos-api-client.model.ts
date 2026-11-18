import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import type { AppState } from '../app.config';
import { DestinoViajeModel } from './destino-viaje.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';

@Injectable({ providedIn: 'root' })
export class DestinosApiClient {
  private store = inject(Store<AppState>);

  add(d: DestinoViajeModel) {
    this.store.dispatch(new NuevoDestinoAction(d));
  }

  elegir(d: DestinoViajeModel) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
}