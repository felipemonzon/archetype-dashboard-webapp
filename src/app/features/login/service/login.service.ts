import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SecurityUtilities } from '../../../shared/security/utils/security.utils';
import { UserModel } from '../../user/model/user-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /**
   * URL de login.
   */
  private loginUrl = `${environment.baseUrl}${environment.login}`;

  /**
   * Constructor.
   *
   * @param httpClient cliente http
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Ejecuta servicio de inicio de sesión.
   *
   * @param user {@interface UserModel} user model
   * @returns agrega JWT al header de authorization
   */
  login(user: UserModel) {
    return this.httpClient
      .post(this.loginUrl, user, { observe: "response" })
      .pipe(
        map((response: HttpResponse<any>) => {
          SecurityUtilities.setToken(
            response.headers.get(SecurityUtilities.authorization) as string
          );
          SecurityUtilities.setUserData(response.body);
        })
      );
  }

  loginMock(): void {
    SecurityUtilities.setToken(
      this.tokenMock()
    );
    SecurityUtilities.setUserData(this.mockUser());
  }

  /**
   * Mock de usuario.
   *
   * @returns usuario mock
   */
  private mockUser(): UserModel {
    return {
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
      enterprise_name: 'Empresa lider en su ramo',
      enterprise_id: 1,
      profiles: [{
        id: 1,
        name: 'Admin',
        value: 'ADMIN',
        status: true
      },
      {
        id: 2,
        name: 'Customer',
        value: 'CUSTOMER',
        status: true
      }],
      social_networks: [
        {
          id: 1,
          name: 'Facebook',
          path: 'https://www.facebook.com/',
          icon: 'fa-facebook'
        },
        {
          id: 2,
          name: 'Linkedin',
          path: 'https://www.linkedin.com/',
          icon: 'fa-linkedin'
        }
      ]
    }
  }

  private tokenMock(){
    return "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmZWxpcGVtb256b24yNzA1IiwiaWF0IjoxNzU3NDQzNTY0LCJleHAiOjM3ODcwMDM3NDQzNTY0fQ.twyJnFfWOjdlcIv6mmgKZS17vfcls5IaFzHoY2On070igxWX8q1uweFpRDXGuuTgW5AtC0c7witz-rNrsYThDw";
  }
}
