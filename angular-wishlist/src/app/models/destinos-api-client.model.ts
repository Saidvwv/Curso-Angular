import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import type { AppState } from '../app.config';
import { DestinoViajeModel } from './destino-viaje.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';

@Injectable({ providedIn: 'root' })
export class DestinosApiClient {
  private store: Store<AppState> = inject(Store);
  private items = toSignal(
    this.store.select((state) => state.destinos.items),
    { initialValue: [] as DestinoViajeModel[] }
  );

  add(d: DestinoViajeModel) {
    this.store.dispatch(new NuevoDestinoAction(d));
  }

  elegir(d: DestinoViajeModel) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

  getById(id: string): DestinoViajeModel | null {
    return this.items().find((d: DestinoViajeModel) => d.id === id) ?? null;
  }
}