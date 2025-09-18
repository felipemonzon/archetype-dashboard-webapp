import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { MenuInfo } from "../model/menu-item.model";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  /**
   * URL del menu.
   */
  private menuUrl = `${environment.baseUrl}${environment.menu}`;
  
  private menuItems = signal<MenuInfo[]>([
    {
      id: 1,
      title: 'app.menu.dashboard',
      icon: 'fa fa-dashboard',
      path: 'welcome',
      children: []
    },
    {
      id: 3,
      title: 'app.menu.error.title',
      icon: 'fa fa-bug',
      children: [
        {
          id: 1,
          title: 'app.menu.error.not_found',
          icon: 'fa fa-xmark',
          path: 'not_found',
          children: []
        },
        {
          id: 2,
          title: 'app.menu.error.forbidden',
          icon: 'fa fa-xmark',
          path: 'error/forbidden',
          children: []
        },
        {
          id: 3,
          title: 'app.menu.error.server',
          icon: 'fa fa-xmark',
          path: 'error/server',
          children: []
        }
      ]
    },
    {
      id: 2,
      title: 'app.menu.management.title',
      icon: 'fa fa-cogs',
      children: [
        {
          id: 1,
          title: 'app.menu.management.users',
          icon: 'fa fa-users',
          path: 'users',
          children: []
        },
        {
          id: 2,
          title: 'app.menu.management.settings',
          icon: 'fa fa-cog',
          path: 'settings',
          children: []
        }
      ]
    }
  ]); // Mock data for menu items, replace with actual API call if needed

  /**
   * Constructor.
   *
   * @param httpClient cliente http
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Consulta el menú activo.
   */
  public getActive(): Observable<MenuInfo[]>  {    
    return this.httpClient.get<MenuInfo[]>(this.menuUrl);
  }

  public getMock(): MenuInfo[] {    
    return this.menuItems();
  }
}
