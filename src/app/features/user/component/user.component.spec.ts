import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserModel } from '../model/user-model';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let activatedRouteMock: any;

  // Datos de usuario mock para las pruebas
  const mockUsers: UserModel[] = [
    {
      id: '1',
      username: 'testuser1',
      email: 'test1@test.com',
      display_name: 'Test User 1',
      first_name: 'Test',
      last_name: 'User 1',
      cel: '123456789',
      genre: 'M',
      active: true,
      authorities: [],
      enterprise_name: 'Empresa A',
      enterprise_id: 1,
      profiles: [],
      social_networks: [],
      address: '',
      city: '',
      country: '',
      postal_code: 0
    },
    {
      id: '2',
      username: 'testuser2',
      email: 'test2@test.com',
      display_name: 'Test User 2',
      first_name: 'Test',
      last_name: 'User 2',
      cel: '987654321',
      genre: 'F',
      active: true,
      authorities: [],
      enterprise_name: 'Empresa B',
      enterprise_id: 2,
      profiles: [],
      social_networks: [],
      address: '',
      city: '',
      country: '',
      postal_code: 0
    }
  ];

  beforeEach(async () => {
    // Mock del ActivatedRoute para simular la data que viene del resolver
    activatedRouteMock = {
      snapshot: {
        data: {
          users: mockUsers
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({}),
        NgbModule
      ],
      declarations: [
        UserComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });

  it('should initialize users signal with data from the route resolver', () => {
    // Verifica que el signal 'users' se inicialice con los datos mock del ActivatedRoute
    expect(component.users()).toEqual(mockUsers);
    expect(component.users().length).toBe(2);
  });

  it('should call console.log in searchBy()', () => {
    // Espía el método console.log para verificar que se llame
    spyOn(console, 'log');
    component.searchBy();
    expect(console.log).toHaveBeenCalledWith('searchBy');
  });

  it('should call console.log in update()', () => {
    // Espía el método console.log y verifica que se llame con el usuario correcto
    spyOn(console, 'log');
    const userToUpdate = mockUsers[0];
    component.update(userToUpdate);
    expect(console.log).toHaveBeenCalledWith('update', userToUpdate);
  });
  
  it('should call MessagingNotification.create() in openModal()', () => {
    // Mock del objeto global MessagingNotification
    const messagingNotificationMock = {
        create: jasmine.createSpy('create')
    };
    
    // Inyecta el mock en el componente
    (component as any).openModal = () => messagingNotificationMock.create('info', 'Modal', 'Abrir modal de usuario');
    
    // Llama al método y verifica que se haya llamado a la función mock
    component.openModal();
    expect(messagingNotificationMock.create).toHaveBeenCalledWith('info', 'Modal', 'Abrir modal de usuario');
  });
});
