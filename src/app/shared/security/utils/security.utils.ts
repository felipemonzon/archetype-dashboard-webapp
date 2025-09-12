import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserModel } from "../../../features/user/model/user-model";
import { AuthorityModel } from "../../../features/profile/model/authority.model";

@Injectable({
  providedIn: "root",
})
export class SecurityUtilities {
  /**
   * Propiedad de perfil.
   */
  private static user = "userData";
  /**
   * Authorization header.
   */
  static authorization = "authorization";

  constructor(private router: Router) {}

  /**
   * Guarda los datos de usuario en sesion.
   *
   * @param data Datos del usuario
   */
  static setUserData(data: UserModel) {
    localStorage.setItem(this.user, JSON.stringify(data));
  }

  /**
   * Guarda el token que se usara en peticiones futuras.
   *
   * @param token token devuelto por el backend
   */
  static setToken(token: string) {
    localStorage.setItem(this.authorization, token);
  }

  /**
   * Obtiene los datos del usuario.
   *
   * @returns datos del usuario
   */
  static getUser(): UserModel {
    return JSON.parse(localStorage.getItem(this.user) as string) as UserModel;
  }

  /**
   * Consulta el token de sesión.
   *
   * @returns token de sesión
   */
  static getToken() {
    return localStorage.getItem(this.authorization);
  }

  /**
   * Obtiene los perfiles del usuario.
   *
   * @returns datos del usuario
   */
  static getProfiles(): AuthorityModel[] {
    return (JSON.parse(localStorage.getItem(this.user) as string) as UserModel).profiles;
  }

  /**
   * Cierra sesión.
   */
  static logout() {
    localStorage.removeItem(this.authorization);
    localStorage.removeItem(this.user);
  }

  /**
   * valida si esta el token en sesión.
   */
  static isLoggedIn(): boolean {
    return localStorage.getItem(this.authorization) !== null;
  }

  /**
   * Cierra la sesión.
   */
  doLogout() {
    let removeToken = localStorage.removeItem(SecurityUtilities.authorization);
    if (removeToken == null) {
      localStorage.removeItem(SecurityUtilities.user);
      this.router.navigate(["login"]);
    }
  }
}
