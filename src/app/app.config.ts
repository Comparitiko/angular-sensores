import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app.routes';
import { TokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([TokenInterceptor]), withFetch()),
  ],
};
