import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { permissionGuard } from './permission.guard';
import { SecurityUtilities } from '../../shared/security/utils/security.utils';
import { NgModule } from '@angular/core';

// 1. Define un módulo vacío para simular la carga perezosa.
@NgModule({})
class MockModule {}

describe('permissionGuard', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Proveemos los mocks y el guard
      providers: [
        provideRouter([
          { path: 'login', loadChildren: () => Promise.resolve(MockModule) },
          { path: 'forbidden', loadChildren: () => Promise.resolve(MockModule) }
        ])
      ]
    });
  
    router = TestBed.inject(Router);
  });

  // Escenario 1: El usuario no está autenticado
  it('should redirect to login if no auth token is found', () => {
    spyOn(SecurityUtilities, 'getToken').and.returnValue(null);
    spyOn(router, 'createUrlTree').and.returnValue({} as any);

    const result = TestBed.runInInjectionContext(() => permissionGuard({ data: { role: 'admin' } } as any, {} as any));

    expect(SecurityUtilities.getToken).toHaveBeenCalled();
    expect(result).toEqual(router.createUrlTree(['/login']));
  });

  // Escenario 2: El usuario está autenticado pero no tiene el rol necesario
  it('should redirect to forbidden if user is authenticated but lacks permission', () => {
    spyOn(router, 'createUrlTree').and.returnValue({} as any);
    spyOn(SecurityUtilities, 'getToken').and.returnValue("token");
    spyOn(SecurityUtilities, 'getUser').and.returnValue({
      profiles: [{
        name: 'user',
        id: 1,
        value: '',
        status: false
      }],
      id: '',
      username: '',
      first_name: '',
      last_name: '',
      display_name: '',
      cel: '',
      email: '',
      genre: '',
      active: false,
      authorities: [],
      enterprise_name: '',
      enterprise_id: 0,
      social_networks: [],
      address: '',
      city: '',
      country: '',
      postal_code: 0
    });

    const result = TestBed.runInInjectionContext(() => permissionGuard({ data: { role: 'admin' } } as any, {} as any));
  
    expect(SecurityUtilities.getToken).toHaveBeenCalled();
    expect(SecurityUtilities.getUser).toHaveBeenCalled();
    expect(result).toEqual(router.createUrlTree(['/forbidden']));
  });

  // Escenario 3: El usuario está autenticado y tiene el rol necesario
  it('should allow access if user has the required permission', () => {
    spyOn(SecurityUtilities, 'getToken').and.returnValue("some-token");
    spyOn(SecurityUtilities, 'getUser').and.returnValue({
      profiles: [{
        name: 'admin',
        id: 1,
        value: '',
        status: false
      }],
      id: '',
      username: '',
      first_name: '',
      last_name: '',
      display_name: '',
      cel: '',
      email: '',
      genre: '',
      active: false,
      authorities: [],
      enterprise_name: '',
      enterprise_id: 0,
      social_networks: [],
      address: '',
      city: '',
      country: '',
      postal_code: 0
    });

    const result = TestBed.runInInjectionContext(() => permissionGuard({ data: { role: 'admin' } } as any, {} as any));

    expect(SecurityUtilities.getToken).toHaveBeenCalled();
    expect(SecurityUtilities.getUser).toHaveBeenCalled();
    expect(result).toBe(true);
  });

    // Edge Case: User is authenticated but `route.data.role` is undefined
  it('should redirect to forbidden if route data role is not defined', () => {
    spyOn(router, 'createUrlTree').and.returnValue({} as any);
    spyOn(SecurityUtilities, 'getToken').and.returnValue('some-token');
    spyOn(SecurityUtilities, 'getUser').and.returnValue({
      profiles: [{
        name: 'admin',
        id: 0,
        value: '',
        status: false
      }],
      id: '',
      username: '',
      first_name: '',
      last_name: '',
      display_name: '',
      cel: '',
      email: '',
      genre: '',
      active: false,
      authorities: [],
      enterprise_name: '',
      enterprise_id: 0,
      social_networks: [],
      address: '',
      city: '',
      country: '',
      postal_code: 0

    });
    const result = TestBed.runInInjectionContext(() => permissionGuard({ data: {} } as any, {} as any));
  
    expect(SecurityUtilities.getToken).toHaveBeenCalled();
    expect(SecurityUtilities.getUser).toHaveBeenCalled();
    expect(result).toEqual(router.createUrlTree(['/forbidden']));
  });
});
