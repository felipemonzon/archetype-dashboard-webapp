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
}
