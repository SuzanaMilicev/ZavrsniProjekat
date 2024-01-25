import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggedIn) {
    router.navigate(['login']);
    // moze snackbar you dont have permission for this page, please log in
    return false;
  }
  else {
    return true;
  }
};
