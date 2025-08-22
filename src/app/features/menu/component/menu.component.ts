import { Component } from '@angular/core';
import { MenuService } from '../service/menu.service';
import { MenuInfo } from '../model/menu-item.model';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  menuItems: MenuInfo[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenu();
  }

  private getMenu(): void {
    this.menuItems = this.menuService.getMock();
  }
}
