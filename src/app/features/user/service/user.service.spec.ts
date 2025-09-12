import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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
    address: 'Gran Apple',
    city: 'New York',
    country: 'USA',
    postal_code: 1000,
    active: true,
    authorities: [],
    enterprise_name: 'Empresa XYZ',
    enterprise_id: 1,
    profiles: [{
      id: 1,
      name: "Admin",
      value: "ADMIN",
      status: true
    }],
    social_networks: []
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // Provee el servicio que se va a probar
      providers: [
        UserService
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

  it('should retrieve data from the API via GET', (done) => {
    // Llama al método del servicio que hace la petición GET
    service.getData().subscribe(user => {
      expect(user).toEqual(userMockData);
      done();
    });

    const expectedUrl = `http://localhost:8080/users`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(userMockData); 
  });

  it('should return a mock user array from getDataMock', (done) => {
    // Llama al método del servicio y verifica que la respuesta sea el arreglo mock
    service.getDataMock().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual([userMockData]);
      done();
    });
  });
});
