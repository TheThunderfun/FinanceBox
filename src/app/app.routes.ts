import { Routes } from '@angular/router';
import { SignUpComponent } from './componentes/sign-up/sign-up.component';
import { LoginComponent } from './componentes/login/login.component';
import { MovimientosComponent } from './componentes/movimientos/movimientos.component';
import { MonedasComponent } from './componentes/monedas/monedas.component';
import { monedasResolver } from './servicios/monedas.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: SignUpComponent,
  },
  {
    path: 'movimientos',
    loadComponent: () =>
      import('./componentes/movimientos/movimientos.component').then(
        (m) => m.MovimientosComponent
      ),
    resolve: { monedas: monedasResolver },
  },
  {
    path: 'monedas',
    loadComponent: () =>
      import('./componentes/monedas/monedas.component').then(
        (m) => m.MonedasComponent
      ),
  },
];
