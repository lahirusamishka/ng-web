import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuarantorRoutingModule } from './guarantor-routing.module';
import { GuarantorComponent } from './guarantor/guarantor.component';


@NgModule({
  declarations: [GuarantorComponent],
  imports: [
    CommonModule,
    GuarantorRoutingModule,
    SharedModule
  ]
})
export class GuarantorModule { }
