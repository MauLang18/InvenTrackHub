import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../pages/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const user = authService.userToken;

  // if (user) {
  //   return true;
  // }

  // router.navigate(['/login']);
  return true;
};
