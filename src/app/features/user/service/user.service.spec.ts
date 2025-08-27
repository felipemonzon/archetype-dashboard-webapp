import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { UserModel } from '../model/user-model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let userMockData: UserModel = {
      id: '1',
      username: 'asmitah27',
      email: 'user@user.com',
      display_name: 'Felipe Monzón',
      first_name: 'Felipe',
      last_name: 'Monzón',
      cel: '123456789',
      genre: 'M',
      active: true,
      authorities: [],
      enterprise_name: 'Empresa XYZ',
      enterprise_id: 1,
      profiles: []
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // Provee el servicio que se va a probar
      providers: [
        UserService,
        provideHttpClientTesting()
      ]
    });

    // Inyecta el servicio y el controlador de mock HTTP para usar en las pruebas
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Verifica que no haya peticiones HTTP pendientes después de cada prueba
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    // Verifica que el servicio se haya creado correctamente
    expect(service).toBeTruthy();
  });

  it('should retrieve data from the API via GET', () => {
    // Crea un usuario mock para simular la respuesta del API
    const dummyUser = userMockData;

    // Llama al método del servicio que hace la petición GET
    service.getData().subscribe(user => {
      // Verifica que la respuesta recibida sea el usuario mock
      expect(user).toEqual(dummyUser);
    });

    // Verifica que se haya hecho una petición GET a la URL correcta
    const req = httpMock.expectOne(`${(service as any).loginUrl}`);
    expect(req.request.method).toBe('GET');

    // Envía la respuesta mock
    req.flush(dummyUser);
  });

  it('should return a mock user array from getDataMock', (done) => {
    // Crea un arreglo de usuarios mock
    const mockUsers: UserModel[] = [userMockData];

    // Llama al método del servicio y verifica que la respuesta sea el arreglo mock
    service.getDataMock().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(mockUsers);
      done(); // Llama a done() para indicar que la prueba asíncrona ha terminado
    });
  });
});
