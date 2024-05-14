import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { inject } from '@angular/core';

import { RefreshTokenManagerService } from '../../auth/services/refresh-token-manager.service';


export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (req.url === environments.loginUrl) {
    return next(req);
  }
  
  const refreshTokenManagerService = inject(RefreshTokenManagerService);

  const newReq = refreshTokenManagerService.cloneRequest(req);
  return next(newReq);
};
