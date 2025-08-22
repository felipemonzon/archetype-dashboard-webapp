import { Routes } from "@angular/router";
import { WelcomeComponent } from "../../features/welcome/welcome.component";
import { UserComponent } from "../../features/user/component/user.component";
import { usersResolver } from "../../features/user/resolver/user.resolver";

export const HomeLayoutRoutes: Routes = [
    { path: '', pathMatch: 'prefix', redirectTo: 'welcome' },
    { path: '', component: WelcomeComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'users', component: UserComponent, resolve: { users: usersResolver } }
];