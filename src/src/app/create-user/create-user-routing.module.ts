import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../shared/layout/layout.component";
import { CreateUserComponent } from "./create-user.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [{ path: "", component: CreateUserComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUserRoutingModule {}
