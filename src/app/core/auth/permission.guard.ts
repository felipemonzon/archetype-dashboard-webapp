import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecurityUtilities } from '../../shared/security/utils/security.utils';

export const permissionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authToken = SecurityUtilities.getToken();
  if (authToken) {
    const userData = SecurityUtilities.getUser();
    const isLoggedIn: boolean = (route.data['role'] && userData.profiles.findIndex((i) => i.name === route.data['role']) === 0);

    if (route.data['role'] && userData.profiles.findIndex((i) => i.name === route.data['role']) === 0) {
      return true;
    }

    console.log('User is authenticated but do not have access.');
    return isLoggedIn || router.createUrlTree(['home/error/forbidden']);
  }
  console.warn('User is not authenticated. Redirecting to login.');
  return router.createUrlTree(['/login']);
};
