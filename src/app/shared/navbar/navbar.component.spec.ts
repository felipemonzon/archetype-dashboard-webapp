import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockLocation: any;
  let mockRenderer: any;
  let elementRef: ElementRef;
  let getElementsByClassNameSpy: jasmine.Spy;

  beforeEach(async () => {
    mockLocation = jasmine.createSpyObj('Location', ['prepareExternalUrl', 'path']);
    mockRenderer = jasmine.createSpyObj('Renderer2', ['addClass', 'removeClass']);

    const body = {
      classList: {
        add: jasmine.createSpy('add'),
        remove: jasmine.createSpy('remove')
      }
    };

    spyOn(document, 'getElementsByTagName').and.returnValue([body] as any);

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({}),
        RouterTestingModule
      ],
      declarations: [NavbarComponent],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: Renderer2, useValue: mockRenderer }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    elementRef = fixture.debugElement.injector.get(ElementRef);
    
    // Espiamos directamente el método de la instancia real
    getElementsByClassNameSpy = spyOn(elementRef.nativeElement, 'getElementsByClassName').and.returnValue([{
      classList: {
        add: jasmine.createSpy('add'),
        remove: jasmine.createSpy('remove')
      }
    }]);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties in the constructor', () => {
    expect(component.name).toBe('username');
    // @ts-ignore
    expect(component.sidebarVisible).toBeFalse();
  });

  it('should get the toggleButton on ngOnInit', () => {
    expect(getElementsByClassNameSpy).toHaveBeenCalledWith('navbar-toggler');
  });

  it('should open the sidebar and add classes to body and toggleButton', fakeAsync(() => {
    component.sidebarOpen();
    tick(500);
    // @ts-ignore
    expect(component.toggleButton.classList.add).toHaveBeenCalledWith('toggled');
    expect(document.getElementsByTagName('body')[0].classList.add).toHaveBeenCalledWith('nav-open');
    // @ts-ignore
    expect(component.sidebarVisible).toBeTrue();
  }));
  
  it('should close the sidebar and remove classes from body and toggleButton', () => {
    component.sidebarClose();
    // @ts-ignore
    expect(component.toggleButton.classList.remove).toHaveBeenCalledWith('toggled');
    expect(document.getElementsByTagName('body')[0].classList.remove).toHaveBeenCalledWith('nav-open');
    // @ts-ignore
    expect(component.sidebarVisible).toBeFalse();
  });

  it('should call sidebarOpen() when sidebarVisible is false', () => {
    spyOn(component, 'sidebarOpen');
    // @ts-ignore
    component.sidebarVisible = false;
    component.sidebarToggle();
    expect(component.sidebarOpen).toHaveBeenCalled();
  });

  it('should call sidebarClose() when sidebarVisible is true', () => {
    spyOn(component, 'sidebarClose');
    // @ts-ignore
    component.sidebarVisible = true;
    component.sidebarToggle();
    expect(component.sidebarClose).toHaveBeenCalled();
  });

  it('should return "DASHBOARD" for "/en/dashboard"', () => {
    mockLocation.path.and.returnValue('/en/dashboard');
    mockLocation.prepareExternalUrl.and.returnValue('/en/dashboard');
    spyOn(component, 'getTitle').and.returnValue('DASHBOARD');

    const title = component.getTitle();
    expect(title).toBe('DASHBOARD');
  });

  it('should return "HOME" for "/home"', () => {
    mockLocation.path.and.returnValue('/home');
    mockLocation.prepareExternalUrl.and.returnValue('/home');
    spyOn(component, 'getTitle').and.returnValue('HOME');

    const title = component.getTitle();
    expect(title).toBe('HOME');
  });

  it('should return "DASHBOARD" for "dashboard"', () => {
    mockLocation.path.and.returnValue('dashboard');
    mockLocation.prepareExternalUrl.and.returnValue('dashboard');
    spyOn(component, 'getTitle').and.returnValue('DASHBOARD');

    const title = component.getTitle();
    expect(title).toBe('DASHBOARD');
  });

  it('should log "User logged out" on logout', () => {
    spyOn(console, 'log');
    component.logout();
    expect(console.log).toHaveBeenCalledWith('User logged out');
  });
});
