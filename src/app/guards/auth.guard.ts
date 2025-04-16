import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('autoplac-token');
  const router = inject(Router);

  if (!token) {
    alert('Nemate pristup ovoj stranici!');
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
