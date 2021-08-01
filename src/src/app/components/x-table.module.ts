import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XTableRoutingModule } from './x-table-routing.module';
import { XTableComponent } from './x-table/x-table.component';


@NgModule({
  declarations: [XTableComponent],
  imports: [
    CommonModule,
    XTableRoutingModule,
    SharedModule
  ]
})
export class XTableModule { }
