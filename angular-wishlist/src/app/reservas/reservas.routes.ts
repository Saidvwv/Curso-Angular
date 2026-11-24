import { Routes } from '@angular/router';
import { ReservasListado } from './reservas-listado/reservas-listado';
import { ReservasDetalle } from './reservas-detalle/reservas-detalle';

export const RESERVAS_ROUTES: Routes = [
  { path: '', component: ReservasListado },
  { path: ':id', component: ReservasDetalle },
];