import { GuarantorDetailsComponent } from './guarantor-details/guarantor-details.component';
import { GuarantorComponent } from './guarantor/guarantor.component';
import { LayoutComponent } from './../shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: GuarantorComponent },
    ]
  },
  {
    path: "detail/:id",
    component: LayoutComponent,
    children: [
      { path: '', component: GuarantorDetailsComponent },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuarantorRoutingModule { }
