import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import type { AppState } from '../app.config';
import { APP_CONFIG } from '../app-config.token';
import { InitMyDataAction } from '../models/destinos-viajes-state.model';

@Injectable({ providedIn: 'root' })
export class AppLoadService {
  private store: Store<AppState> = inject(Store);
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  async initializeDestinosViajesState(): Promise<void> {
    try {
      const headers = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
      const destinos = await firstValueFrom(
        this.http.get<string[]>(this.config.apiEndpoint + '/my', { headers })
      );
      this.store.dispatch(new InitMyDataAction(destinos));
    } catch (error) {
      console.error('No se pudieron cargar los destinos del servidor', error);
    }
  }
}