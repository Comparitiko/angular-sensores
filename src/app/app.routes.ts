import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { PlantationsComponent } from './pages/plantations/plantations.component';
import { RegisterComponent } from './pages/register/register.component';
import { SensorsComponent } from './pages/sensors/sensors.component';

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
    loadChildren: () => [
      {
        path: '',
        component: PlantationsComponent,
      },
      {
        path: ':plantationId/sensors',
        component: SensorsComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: Error404Component,
  },
];
