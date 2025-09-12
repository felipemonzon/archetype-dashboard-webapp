import { Routes } from "@angular/router";
import { WelcomeComponent } from "../../features/welcome/welcome.component";
import { UserComponent } from "../../features/user/component/user.component";
import { usersResolver } from "../../features/user/resolver/user.resolver";
import { NotfoundComponent } from "../errors/404/notFound.component";
import { ForbiddenComponent } from "../errors/403/forbidden.component";
import { permissionGuard } from "../../core/auth/permission.guard";
import { ServerErrorComponent } from "../errors/500/server.error.component";
import { ProfileComponent } from "../../features/profile/component/profile.component";
import { SupportComponent } from "../../features/support/component/support.component";

export const HomeLayoutRoutes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'welcome', component: WelcomeComponent, canActivate: [permissionGuard] },
    { path: 'users', component: UserComponent, resolve: { users: usersResolver } },
    { path: 'user/profile', component: ProfileComponent },
    { path: 'support', component: SupportComponent },
    { path: 'error/forbidden', component: ForbiddenComponent }, // La ruta para la página 403
    { path: 'error/server', component: ServerErrorComponent }, // La ruta para la página 500,
    { path: '**', component: NotfoundComponent } // Ruta comodín para manejar rutas no definidas (debe ir al final).
];