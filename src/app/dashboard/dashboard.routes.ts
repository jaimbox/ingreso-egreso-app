import { Routes } from '@angular/router';

import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { StadisticaComponent } from '../ingreso-egreso/stadistica/stadistica.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StadisticaComponent },
  { path: 'ingreso-egreso', component: IngresoEgresoComponent },
  { path: 'detalle', component: DetalleComponent },
];
