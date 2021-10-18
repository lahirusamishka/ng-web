import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanStatusRoutingModule } from './loan-status-routing.module';
import { LoanStatusComponent } from './loan-status/loan-status.component';


@NgModule({
  declarations: [LoanStatusComponent],
  imports: [
    CommonModule,
    LoanStatusRoutingModule
  ]
})
export class LoanStatusModule { }
