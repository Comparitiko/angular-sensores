import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token');

  if (token) {
    return true;
  }

  return router.navigate(['/login']);
};
