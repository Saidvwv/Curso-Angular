import { ApplicationConfig, inject, isDevMode, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ActionReducerMap, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideTranslateService, provideTranslateLoader } from '@ngx-translate/core';
import { provideMaplibreWorker } from '@maplibre/ngx-maplibre-gl/config';
import { routes } from './app.routes';
import { APP_CONFIG, APP_CONFIG_VALUE } from './app-config.token';
import { AppLoadService } from './services/app-load.service';
import { TranslationLoader } from './services/translation-loader';
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
    provideMaplibreWorker('maplibre-gl-worker.mjs'),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    provideStore(reducers, { initialState: reducersInitialState }),
    provideEffects([DestinosViajesEffects]),
    provideAppInitializer(() => inject(AppLoadService).initializeDestinosViajesState()),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideTranslateService({
      lang: 'es',
      fallbackLang: 'es',
      loader: provideTranslateLoader(
        () => new TranslationLoader(inject(HttpClient), inject(APP_CONFIG).apiEndpoint)
      ),
      
    }),
  ],
};