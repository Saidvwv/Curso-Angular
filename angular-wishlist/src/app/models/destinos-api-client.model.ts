import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';

import type { AppState } from '../app.config';
import { APP_CONFIG } from '../app-config.token';
import { DestinoViajeModel } from './destino-viaje.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';
import { db } from './my-database.model';

@Injectable({ providedIn: 'root' })
export class DestinosApiClient {
  private store: Store<AppState> = inject(Store);
  protected config = inject(APP_CONFIG);
  private http = inject(HttpClient);
  private items = toSignal(
    this.store.select((state) => state.destinos.items),
    { initialValue: [] as DestinoViajeModel[] }
  );

  add(d: DestinoViajeModel) {
    const headers = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
    this.http
      .post(this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers, observe: 'response' })
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.store.dispatch(new NuevoDestinoAction(d));
            const myDb = db;
            myDb.destinos
              .add({ nombre: d.nombre, imagenUrl: d.imagenUrl })
              .then(() => myDb.destinos.toArray())
              .then((destinos) => {
                console.log('todos los destinos de la db!');
                console.log(destinos);
              });
          }
        },
        error: (error) => console.error('No se pudo guardar el destino en el servidor', error),
      });
  }

  elegir(d: DestinoViajeModel) {
    // aqui incovariamos al servidor
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

  getById(id: string): DestinoViajeModel | null {
    return this.items().find((d: DestinoViajeModel) => d.id === id) ?? null;
  }
}