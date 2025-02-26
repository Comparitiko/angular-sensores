import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { Error404Component } from './pages/error404/error404.component';
import { PlantationComponent } from './pages/plantation/plantation.component';
import { PlantationsComponent } from './pages/plantations/plantations.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'plantations',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'plantations',
    children: [
      {
        path: '',
        component: PlantationsComponent,
      },
      {
        path: ':plantationId',
        component: PlantationComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: Error404Component,
  },
];
