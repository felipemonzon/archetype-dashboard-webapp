import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthorityModel } from "../model/authority.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  /**
   * URL de perfiles.
   */
  private readonly profilePath = `${environment.baseUrl}${environment.profile}`;

  /**
   * Constructor.
   *
   * @param httpClient cliente http
   */
  constructor(private readonly httpClient: HttpClient) {}


  public getData(): Observable<AuthorityModel> {
    return this.httpClient.get<AuthorityModel>(this.profilePath);
  }

  public getDataMock(): Observable<AuthorityModel[]> {
    return new Observable<AuthorityModel[]>(subscriber => {
      subscriber.next(this.mockUser());
      subscriber.complete();
    });
  }
  /**
   * Mock de profiles.
   *
   * @returns profiles mock
   */
  private mockUser(): AuthorityModel[] {
    return [{
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
      }
    ]
  }

}
