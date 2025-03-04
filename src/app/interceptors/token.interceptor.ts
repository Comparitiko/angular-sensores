import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  req.headers.append('Authorization', `Bearer ${token}`);
  return next(req);
};
