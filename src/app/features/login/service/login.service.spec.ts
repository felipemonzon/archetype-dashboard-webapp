import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { SecurityUtilities } from '../../../shared/security/utils/security.utils';
import { UserModel } from '../../user/model/user-model';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Importa HttpClientTestingModule para simular las peticiones HTTP
      imports: [HttpClientTestingModule],
      // Provee el servicio que se va a probar
      providers: [
        LoginService,
        provideHttpClientTesting()
      ]
    });

    // Inyecta el servicio y el controlador de mock HTTP para usar en las pruebas
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);

    // Espía los métodos de SecurityUtilities para verificar que se llamen
    spyOn(SecurityUtilities, 'setToken');
    spyOn(SecurityUtilities, 'setUserData');
  });

  afterEach(() => {
    // Verifica que no haya peticiones HTTP pendientes después de cada prueba
    httpMock.verify();
  });

  it('should be created', () => {
    // Verifica que el servicio se haya creado correctamente
    expect(service).toBeTruthy();
  });

  it('should send a POST request to the login URL and set security data', () => {
    // Datos de usuario mock para la petición de login
    const dummyUser: UserModel = {
        username: 'testuser',
        password: 'testpassword'
    } as UserModel;

    // Datos de respuesta mock del servidor
    const dummyResponse = { 
        id: '123',
        username: 'testuser'
    } as UserModel;

    const dummyToken = 'mock-jwt-token';
    const loginUrl = `${environment.baseUrl}${environment.login}`;

    // Llama al método del servicio que hace la petición POST
    service.login(dummyUser).subscribe(response => {
      // No hay un valor que se emita en el subscribe, solo se completará
      expect(response).toBeUndefined();
    });

    // Verifica que se haya hecho una petición POST a la URL correcta
    const req = httpMock.expectOne(loginUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyUser);

    // Crea una respuesta mock para el servidor
    const httpResponse = new HttpResponse({
      body: dummyResponse,
      headers: req.request.headers.append(SecurityUtilities.authorization, dummyToken)
    });

    // Envía la respuesta mock
    req.flush(dummyResponse, {
        headers: {
            [SecurityUtilities.authorization]: dummyToken
        }
    });

    // Verifica que los métodos de SecurityUtilities hayan sido llamados con los datos correctos
    expect(SecurityUtilities.setToken).toHaveBeenCalledWith(dummyToken);
    expect(SecurityUtilities.setUserData).toHaveBeenCalledWith(dummyResponse);
  });
});
