import { LoanViewComponent } from './loan-view/loan-view.component';
import { LayoutComponent } from './../shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanComponent } from './loan/loan.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { CreateLoanComponent } from './create-loan/create-loan.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: LoanComponent },
    ]
  },
  {
    path: "view/:id",
    component: LayoutComponent,
    children: [
      { path: '', component: LoanViewComponent },
    ]
  },
  {
    path: "detail/:id",
    component: LayoutComponent,
    children: [
      { path: '', component: LoanViewComponent },
    ]
  },
  {
    path: "new",
    component: LayoutComponent,
    children: [
      { path: '', component: CreateLoanComponent },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
