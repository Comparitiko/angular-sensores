import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { PlantationsComponent } from './pages/plantations/plantations.component';
import { RegisterComponent } from './pages/register/register.component';
import { SensorDataComponent } from './pages/sensor-data/sensor-data.component';
import { SensorComponent } from './pages/sensors/sensors.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'plantations',
    pathMatch: 'full',
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
        pathMatch: 'full',
      },
      {
        path: ':plantationId/sensors',
        component: SensorComponent,
      },
      {
        path: ':plantationId/sensors/:sensorId',
        component: SensorDataComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: Error404Component,
  },
];
