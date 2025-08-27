import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { MenuInfo } from '../model/menu-item.model';
import { MenuService } from '../service/menu.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let menuServiceMock: any;

  // Datos mock para el menú
  const mockMenu: MenuInfo[] = [
    {
      id: 1,
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'dashboard',
      children: []
    },
    {
      id: 2,
      title: 'Users',
      path: '/users',
      icon: 'users',
      children: []
    }
  ];

  beforeEach(async () => {
    // Mock del MenuService para simular su comportamiento
    menuServiceMock = {
      getMock: jasmine.createSpy('getMock').and.returnValue(mockMenu)
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({})
      ],
      declarations: [MenuComponent],
      providers: [
        { provide: MenuService, useValue: menuServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });

  it('should call getMenu on ngOnInit', () => {
    // Verifica que el método getMock del servicio sea llamado al inicializar el componente
    expect(menuServiceMock.getMock).toHaveBeenCalled();
  });

  it('should populate menuItems with data from the service', () => {
    // Verifica que la propiedad menuItems del componente tenga los datos del mock
    expect(component.menuItems).toEqual(mockMenu);
  });
});
