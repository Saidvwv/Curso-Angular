import { Routes } from '@angular/router';

import { ListaDestinos } from './components/lista-destinos/lista-destinos';
import { DestinoDetalle } from './components/destino-detalle/destino-detalle';
import { Login } from './components/login/login';
import { Protected } from './components/protected/protected';
import { VuelosComponent } from './components/vuelos/vuelos-component/vuelos-component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component';
import { VuelosMasInfoComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component';
import { usuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado-guard';

export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponent },
  { path: 'mas-info', component: VuelosMasInfoComponent },
  { path: ':id', component: VuelosDetalleComponent },
];

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinos },
  { path: 'destino/:id', component: DestinoDetalle },
  { path: 'login', component: Login },
  { path: 'protected', component: Protected, canActivate: [usuarioLogueadoGuard] },
  {
    path: 'vuelos',
    component: VuelosComponent,
    canActivate: [usuarioLogueadoGuard],
    children: childrenRoutesVuelos,
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reservas/reservas.routes').then((m) => m.RESERVAS_ROUTES),
  },
];