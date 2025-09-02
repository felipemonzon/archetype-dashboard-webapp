import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Importa el módulo de pruebas de rutas
        TranslateModule.forRoot() // Importa el módulo de traducción
      ],
      // Declara el componente que se va a probar
      declarations: [HomeComponent],
      // Ignora los selectores de los otros componentes para este test de unidad
      // Se asume que app-sidebar, app-navbar, app-footer son componentes separados
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Crea una instancia del componente
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // Dispara la detección de cambios inicial
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Verifica que la instancia del componente se haya creado correctamente
    expect(component).toBeTruthy();
  });

    it('should render the app-sidebar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-sidebar')).toBeTruthy();
  });

  it('should render the app-navbar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });

  it('should render the app-footer component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should render the router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
