import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';
import { of, switchMap } from 'rxjs';

export const privateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  if (authService.authStatus() === AuthStatus.checking) {
    return authService.validateAuth().pipe(
      switchMap((authenticated: boolean) => {
        if (authenticated) {
          // Usuario autenticado, permite la navegación
          return of(true);
        } else {
          // Usuario no autenticado, redirige a la página de inicio de sesión
          router.navigateByUrl('/auth/login');
          return of(false);
        }
      })
    );
  }
  
  router.navigateByUrl('/auth/login');
  return false;
};
