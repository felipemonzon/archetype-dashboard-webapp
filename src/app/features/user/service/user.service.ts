import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserModel } from "../model/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * URL de usuarios.
   */
  private userPath = `${environment.baseUrl}${environment.user}`;

  /**
   * Constructor.
   *
   * @param httpClient cliente http
   */
  constructor(private httpClient: HttpClient) {}


  public getData(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.userPath);
  }

  public getDataMock(): Observable<UserModel[]> {
    return new Observable<UserModel[]>(subscriber => {
      subscriber.next([this.mockUser()]);
      subscriber.complete();
    });
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
  }

}
