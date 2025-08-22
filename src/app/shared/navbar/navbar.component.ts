import { Component, ElementRef, OnInit } from '@angular/core';
import {Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent implements OnInit {
    name: string = " ";
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location,  private element: ElementRef) {
            this.location = location;
        this.sidebarVisible = false;
        this.name = "username"
    }

    ngOnInit(){
      // this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
        let titles: string[] = [];
        var title = this.location.prepareExternalUrl(this.location.path());

        if (title.charAt(0) === "/") {
            titles = title.split("/");
            title = titles[2];
        }
        return title.toUpperCase();
    }

    logout() {
        // Implement logout logic here
        console.log("User logged out");
    }

}
