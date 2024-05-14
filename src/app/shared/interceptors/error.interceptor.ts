import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { EMPTY, catchError, concatMap, finalize, switchMap, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';

import { RefreshTokenManagerService } from '../../auth/services/refresh-token-manager.service';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const refreshTokenManagerService = inject(RefreshTokenManagerService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status==HttpStatusCode.Unauthorized) {

        return authService.refreshToken().pipe(
          switchMap(() => {
            const newReq = refreshTokenManagerService.cloneRequest(req);
            return next(newReq);
          }),
          catchError(() => {
            router.navigateByUrl('/auth/login');
            return EMPTY
          })
        )
      }
      return throwError(() => error)
    })
  )
};
