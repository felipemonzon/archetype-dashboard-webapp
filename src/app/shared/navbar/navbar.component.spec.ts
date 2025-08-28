import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        // Usar TranslateModule.forRoot() es la forma recomendada de testear
        TranslateModule.forRoot(),
      ],
      declarations: [NavbarComponent],
       providers: [

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });

  it('should call sidebarToggle() method when the button is clicked', () => {
    // Espía el método sidebarToggle()
    spyOn(component, 'sidebarToggle');

    const button = fixture.nativeElement.querySelector('.navbar-toggler');
    if (button) {
      button.click();
    }

    // Verifica que el método haya sido llamado
    expect(component.sidebarToggle).toHaveBeenCalled();
  });

  it('should call logout() method when the logout link is clicked', () => {
    // Espía el método logout()
    spyOn(component, 'logout');

    // Encuentra el enlace con el texto de "logout"
    const logoutLink = fixture.nativeElement.querySelector('a.logout');
    
    if (logoutLink) {
        logoutLink.click();
    }
    
    // Verifica que el método haya sido llamado
    expect(component.logout).toHaveBeenCalled();
  });

  it('should have a link to user profile', () => {
    const profileLink = fixture.nativeElement.querySelector('a[href="/menu/user/profile"]');
    
    // Verifica que el enlace al perfil exista en el DOM
    expect(profileLink).toBeTruthy();
  });

  it('should have a link to settings', () => {
    const settingsLink = fixture.nativeElement.querySelector('a[href="/menu/configuration"]');
    // Verifica que el enlace a la configuración exista en el DOM
    expect(settingsLink).toBeTruthy();
  });
});
