import { LayoutComponent } from "./shared/layout/layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./core/guards/auth.guard";

const appRoutes: Routes = [
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule",
  },
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule",
    canActivate: [AuthGuard],
    data: { roles: ["admin", "customer","super-admin"] },
  },
  {
    path: "borrowers",
    loadChildren: "./customers/customers.module#CustomersModule",
    canActivate: [AuthGuard],
    data: { roles: ["admin", "customer","super-admin"] },
  },
  {
    path: "borrower/:id",
    loadChildren: "./users/users.module#UsersModule",
    canActivate: [AuthGuard],
    data: { roles: ["admin", "customer","super-admin"] },
  },
  {
    path: "account",
    loadChildren: "./account/account.module#AccountModule",
    canActivate: [AuthGuard],
    data: { roles: ["admin", "customer","super-admin"] },
  },
 
  {
    path: "about",
    loadChildren: "./about/about.module#AboutModule",
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
