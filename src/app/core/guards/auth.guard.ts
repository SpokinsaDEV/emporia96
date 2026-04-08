import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token'); // O donde guardes tu JWT
  
  if (token) {
    return true; // Adelante, puedes pasar
  } else {
    // Si no hay token, lo mandamos al login
    router.navigate(['/auth/login']);
    return false;
  }
};