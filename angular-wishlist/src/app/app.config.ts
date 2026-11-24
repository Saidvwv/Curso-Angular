import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ActionReducerMap, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { APP_CONFIG, APP_CONFIG_VALUE } from './app-config.token';
import {
  DestinosViajesActions,
  DestinosViajesEffects,
  DestinosViajesState,
  initializeDestinosViajesState,
  reducerDestinosViajes,
} from './models/destinos-viajes-state.model';

export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState, DestinosViajesActions> = {
  destinos: reducerDestinosViajes,
};

const reducersInitialState = {
  destinos: initializeDestinosViajesState(),
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    provideStore(reducers, { initialState: reducersInitialState }),
    provideEffects([DestinosViajesEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};