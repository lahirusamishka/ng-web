import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { LoanComponent } from './loan/loan.component';


@NgModule({
  declarations: [LoanComponent],
  imports: [
    CommonModule,
    LoanRoutingModule,
    SharedModule
  ]
})
export class LoanModule { }
