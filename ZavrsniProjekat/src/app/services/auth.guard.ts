import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggedIn) {
    router.navigate(['login']);
    alert("You do not have permission for this page.")
    return false;
  }
  else {
    return true;
  }
};
