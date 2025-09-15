import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorityModel } from '../model/authority.model';
import { environment } from '../../../../environments/environment';

describe('ProfileService', () => {
  let service: ProfileService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getData() should perform a GET request and return an Observable of AuthorityModel', () => {
    const mockAuthority: AuthorityModel = {
      id: 1,
      name: 'Admin',
      value: 'ADMIN',
      status: true
    };

    service.getData().subscribe(data => {
      expect(data).toEqual(mockAuthority);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}${environment.profile}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthority);
  });

  it('getDataMock() should return an Observable of a hardcoded array of AuthorityModel', (done) => {
    const expectedData: AuthorityModel[] = [{
      id: 1,
      name: 'Admin',
      value: 'ADMIN',
      status: true
    }, {
      id: 2,
      name: 'Customer',
      value: 'CUSTOMER',
      status: true
    }];

    service.getDataMock().subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });
  });

  it('mockUser() should return the correct hardcoded mock data', () => {
    const privateMethod = service['mockUser'];
    const expectedData = [{
      id: 1,
      name: 'Admin',
      value: 'ADMIN',
      status: true
    }, {
      id: 2,
      name: 'Customer',
      value: 'CUSTOMER',
      status: true
    }];
    expect(privateMethod()).toEqual(expectedData);
  });

});
