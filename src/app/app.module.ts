import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoginComponent } from './features/login/component/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './shared/home/home.component';
import { MenuComponent } from './features/menu/component/menu.component';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HttpInterceptor } from './core/interceptor/HttpInterceptorService';
import { ServerErrorInterceptor } from './core/interceptor/HttpErrorInterceptor';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { MyMissingTranslationHandler } from './core/exception/missing.translation.exception';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpLoaderFactory } from './shared/config/translate.config';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true}),
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'es',
      missingTranslationHandler: { 
        provide: MissingTranslationHandler,
        useClass: MyMissingTranslationHandler,
      },
    }),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([HttpInterceptor, ServerErrorInterceptor])
    ),
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
