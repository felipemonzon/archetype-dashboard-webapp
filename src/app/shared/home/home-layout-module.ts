import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HomeLayoutRoutes } from "./home-layout-routing";
import { WelcomeComponent } from "../../features/welcome/welcome.component";
import { DashboardComponent } from "../../features/dashboard/component/dashboard.component";
import { UserComponent } from "../../features/user/component/user.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    WelcomeComponent,
    DashboardComponent,
    UserComponent
  ]
})

export class HomeLayoutModule {}