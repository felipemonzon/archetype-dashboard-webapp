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
      title: 'Dashboard',
      icon: 'fa fa-dashboard',
      path: 'welcome',
      children: []
    },
    {
      id: 2,
      title: 'Administración',
      icon: 'fa fa-cogs',
      children: [
        {
          id: 1,
          title: 'Usuarios',
          icon: 'fa fa-users',
          path: 'users',
          children: []
        },
        {
          id: 2,
          title: 'Configuración',
          icon: 'fa fa-cog',
          path: '/admin/settings',
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
