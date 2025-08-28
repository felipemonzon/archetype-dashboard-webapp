import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from "../service/user.service";
import { UserModel } from "../model/user-model";
import { Observable } from "rxjs";

export const usersResolver = (route: ActivatedRouteSnapshot): Observable<UserModel[]> => {
  // Use a service to fetch all users
  return inject(UserService).getDataMock();
};