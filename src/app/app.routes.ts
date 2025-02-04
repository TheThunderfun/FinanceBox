import { Routes } from '@angular/router';
import { SignUpComponent } from './componentes/sign-up/sign-up.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';

export const routes: Routes = [
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', 
    component: LoginComponent },
  {
    path: 'register',
    component: SignUpComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
