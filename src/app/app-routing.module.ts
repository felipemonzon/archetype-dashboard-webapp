import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './shared/config/loader-config';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './features/login/component/login.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'login' },
  { path: "login", component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [{
      path: '', loadChildren: () => 
        import('./shared/home/home-layout-module').then(
          m => m.HomeLayoutModule
        )
    }]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgxUiLoaderRouterModule.forRoot({ showForeground: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
