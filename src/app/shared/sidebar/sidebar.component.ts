import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  isMobileMenu(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.innerWidth < 991;
    }
    return false
  }
}
