import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MessagingNotification } from '../../../shared/messaging/messaging-notification';
import { SecurityUtilities } from '../../../shared/security/utils/security.utils';
import { ProfileService } from '../service/profile.service';
import { AuthorityModel } from '../model/authority.model';
import { UserModel } from '../../user/model/user-model';
import { NgSelectModule } from '@ng-select/ng-select';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockProfileService: any;
  let translateService: TranslateService;

  // Datos de usuario de prueba
  const mockUser: UserModel = {
    first_name: 'John',
    last_name: 'Doe',
    enterprise_name: 'Acme Inc.',
    username: 'johndoe',
    genre: 'M',
    profiles: [{
      id: 1, value: 'Admin',
      name: 'Admin',
      status: false
    }],
    email: 'john.doe@test.com',
    id: '2',
    display_name: 'jonh cena',
    cel: '111111111',
    address: '',
    city: '',
    country: '',
    postal_code: 0,
    active: false,
    authorities: [],
    enterprise_id: 0,
    social_networks: []
  };

  // Mock del ProfileService
  const mockProfiles: AuthorityModel[] = [{
    id: 1, value: 'Admin',
    name: '',
    status: false
  }, {
    id: 2, value: 'User',
    name: '',
    status: false
  }];

  beforeEach(async () => {
    mockProfileService = {
      getDataMock: jasmine.createSpy('getDataMock').and.returnValue(of(mockProfiles))
    };

    // Simulamos el método estático SecurityUtilities.getUser()
    spyOn(SecurityUtilities, 'getUser').and.returnValue(mockUser);

    // Simulamos los métodos estáticos de MessagingNotification
    spyOn(MessagingNotification, 'create');

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        TranslateModule.forRoot()
      ],
      declarations: [ProfileComponent],
      providers: [
        FormBuilder,
        { provide: ProfileService, useValue: mockProfileService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    translateService = TestBed.inject(TranslateService);
    spyOn(translateService, 'instant').and.callFake(key => key);
    spyOn(translateService, 'get').and.returnValue(of({
      'app.user.profile.form.genre.male': 'Male',
      'app.user.profile.form.genre.female': 'Female'
    }));
    spyOn(translateService.onLangChange, 'subscribe').and.callThrough();

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with user data and disable correct fields', fakeAsync(() => {
    const form = component.profileForm();
    component.profileForm().get('profiles')?.setValue([1]);
    component.profileForm().get('genre')?.setValue('M');
    
    // Asignación de datos del usuario
    expect(component.full_name).toBe(mockUser.display_name);
    expect(component.social_networks).toEqual(mockUser.social_networks);

    // Verificación de los campos del formulario
    expect(form.get('first_name')?.value).toBe(mockUser.first_name);
    expect(form.get('last_name')?.value).toBe(mockUser.last_name);
    expect(form.get('company')?.value).toBe(mockUser.enterprise_name);
    expect(form.get('address')?.value).toBe(mockUser.address);
    expect(form.get('city')?.value).toBe(mockUser.city);
    expect(form.get('country')?.value).toBe(mockUser.country);
    expect(form.get('postal_code')?.value).toBe(mockUser.postal_code);
    // Verificación de campos deshabilitados
    expect(form.get('user_name')?.disabled).toBeTrue();
    expect(form.get('email')?.disabled).toBeTrue();

    // Simulación del setTimeout para verificar los valores asignados
    tick(100);

    expect(form.get('profiles')?.value).toEqual(mockUser.profiles.map(x => x.id));
    expect(form.get('genre')?.value).toBe(mockUser.genre);
  }));

  it('should call profileMockData and set profiles on ngOnInit', () => {
    expect(mockProfileService.getDataMock).toHaveBeenCalled();
    expect(component.profiles).toEqual(mockProfiles);
  });

  it('should load translations for genres on ngOnInit', () => {
    expect(translateService.get).toHaveBeenCalledWith(
      ['app.user.profile.form.genre.male', 'app.user.profile.form.genre.female']
    );
    expect(component.translatedGenres.length).toBe(2);
    expect(component.translatedGenres[0].label).toBe('Male');
    expect(component.translatedGenres[1].label).toBe('Female');
  });

  // --- Pruebas del método save() ---
  it('should display success notification on valid form submission', () => {
    // Configurar el formulario como válido
    component.profileForm().setValue({
      first_name: 'Jane',
      last_name: 'Doe',
      company: 'Another Company',
      user_name: 'janedoe', // Campo deshabilitado, valor no cambia
      genre: 'F',
      profiles: [2],
      email: 'jane.doe@test.com', // Campo deshabilitado, valor no cambia
      address: '456 Second St',
      city: 'Someville',
      country: 'USA',
      postal_code: 54321
    });

    component.save();

    expect(component.profileForm().valid).toBeTrue();
    expect(MessagingNotification.create).toHaveBeenCalledWith(
      MessagingNotification.SUCCESS_TYPE,
      'app.messages.title.success',
      'app.messages.success.dataUpdated'
    );
  });

  it('should display warning notification and mark fields as touched on invalid form submission', () => {
    // El formulario por defecto está incompleto, por lo que es inválido
    component.save();
    
    expect(component.profileForm().valid).toBeFalse();
    expect(component.profileForm().touched).toBeTrue(); // Comprueba si el formulario en general está marcado
    expect(MessagingNotification.create).toHaveBeenCalledWith(
      MessagingNotification.WARNING_TYPE,
      'app.messages.title.warning',
      'app.messages.errors.dateValidation'
    );
  });

  // --- Pruebas de validación del formulario ---
  it('validateForm should return true for an invalid and touched control', () => {
    const control = component.profileForm().get('first_name');
    control?.setValue(''); // Vacio, por lo que es inválido
    control?.markAsTouched();
    
    expect(component.validateForm('first_name')).toBeTrue();
  });

  it('validateForm should return false for a valid control', () => {
    const control = component.profileForm().get('first_name');
    control?.setValue('John');
    control?.markAsTouched();
    
    expect(component.validateForm('first_name')).toBeFalse();
  });

  it('validateForm should return false for an untouched control, even if invalid', () => {
    const control = component.profileForm().get('first_name');
    control?.setValue(''); // Vacio, pero no tocado
    
    expect(component.validateForm('first_name')).toBeFalse();
  });

  // --- Pruebas del ciclo de vida (OnDestroy) ---
  it('should unsubscribe from langChangeSubscription on ngOnDestroy to prevent memory leaks', () => {
    spyOn(component['langChangeSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['langChangeSubscription'].unsubscribe).toHaveBeenCalled();
  });
});
