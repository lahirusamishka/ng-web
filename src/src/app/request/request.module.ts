import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request/request.component';

@NgModule({
  declarations: [RequestComponent],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule,
  ]
})
export class RequestModule { }
