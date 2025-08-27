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
  // Espiamos los métodos de SecurityUtilities para controlar su comportamiento
  let securityUtilitiesSpy: jasmine.SpyObj<SecurityUtilities>;

  // Creamos un mock para el Router para simular la navegación
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    createUrlTree: jasmine.createSpy('createUrlTree').and.callFake((commands: any[]) => ({
      commands: commands,
      toString: () => `UrlTree(${commands.join('/')})`
    }))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Proveemos los mocks y el guard
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SecurityUtilities, useValue: securityUtilitiesSpy },
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

    const result = TestBed.runInInjectionContext(() => permissionGuard({ data: { role: 'admin' } } as any, {} as any));

    expect(SecurityUtilities.getToken).toHaveBeenCalled();
    expect(result).toEqual(router.createUrlTree(['/login']));
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/login']);
  });

  // Escenario 2: El usuario está autenticado pero no tiene el rol necesario
  it('should redirect to forbidden if user is authenticated but lacks permission', () => {
    spyOn(SecurityUtilities, 'getToken').and.returnValue(null);
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
      enterprise_id: 0
    });

    const result = TestBed.runInInjectionContext(() => permissionGuard({ data: { role: 'admin' } } as any, {} as any));

    expect(SecurityUtilities.getToken).toHaveBeenCalled();
    expect(SecurityUtilities.getUser).toHaveBeenCalled();
    expect(result).toEqual(router.createUrlTree(['/forbidden']));
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/forbidden']);
  });

  // Escenario 3: El usuario está autenticado y tiene el rol necesario
  it('should allow access if user has the required permission', () => {
    spyOn(SecurityUtilities, 'getToken').and.returnValue(null);
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
      enterprise_id: 0
    });

    const result = TestBed.runInInjectionContext(() => permissionGuard({ data: { role: 'admin' } } as any, {} as any));

    expect(SecurityUtilities.getToken).toHaveBeenCalled();
    expect(SecurityUtilities.getUser).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
