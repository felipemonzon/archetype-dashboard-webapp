import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let loginService: LoginService;

  beforeEach(async () => {
    // Crea un mock para el Router para evitar errores de navegación en los tests
    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    // Crea un mock para el LoginService
    const loginServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of({ success: true }))
    };

    await TestBed.configureTestingModule({
      // Importa ReactiveFormsModule para que el TestBed reconozca FormGroup y FormBuilder
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerMock },
        { provide: LoginService, useValue: loginServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // Inyecta el mock del Router y del LoginService
    router = TestBed.inject(Router);
    loginService = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });

  it('should initialize the form with username and password controls', () => {
    // Verifica que el formulario y sus controles existan
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['username']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('should validate username and password as required fields', () => {
    const usernameControl = component.loginForm.controls['username'];
    const passwordControl = component.loginForm.controls['password'];

    // Los campos deben ser inválidos inicialmente
    expect(usernameControl.valid).toBeFalse();
    expect(passwordControl.valid).toBeFalse();

    // Establece un valor y verifica que ahora son válidos
    usernameControl.setValue('testuser');
    passwordControl.setValue('testpassword');

    expect(usernameControl.valid).toBeTrue();
    expect(passwordControl.valid).toBeTrue();
  });
  
  it('should navigate to "home" on successful login', () => {
    // Establece valores válidos en el formulario
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testpassword');

    // Llama al método de login
    component.login();

    // Verifica que el método navigate del Router haya sido llamado con "home"
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should provide a convenience getter for form controls', () => {
    // Verifica que el getter "form" devuelva los controles del formulario
    const formControls = component.form;
    expect(formControls).toEqual(component.loginForm.controls);
  });
});
