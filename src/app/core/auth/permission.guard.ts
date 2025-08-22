import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecurityUtilities } from '../../shared/security/utils/security.utils';

export const permissionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authToken = SecurityUtilities.getToken();
  if (authToken) {
    const userData = SecurityUtilities.getUser();
    const isLoggedIn: boolean = (route.data['role'] && userData.profiles.findIndex((i) => i.name === route.data['role']) === 0);
    /**
    if (route.data.role && userData.profiles.findIndex((i) => i.name === route.data.role) === 0) {
      return true;
    }
    */
    return isLoggedIn || router.navigate(['/forbidden']);
  }

  return authToken || router.navigate(['/login']);
};
