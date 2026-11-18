import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ActionReducerMap, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import {
  DestinosViajesActions,
  DestinosViajesEffects,
  DestinosViajesState,
  initializeDestinosViajesState,
  reducerDestinosViajes,
} from './models/destinos-viajes-state.model';

// redux init
export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState, DestinosViajesActions> = {
  destinos: reducerDestinosViajes,
};

const reducersInitialState = {
  destinos: initializeDestinosViajesState(),
};
// redux fin init

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(reducers, { initialState: reducersInitialState }),
    provideEffects([DestinosViajesEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};