
import { XCheckboxComponent } from './../components/x-checkbox/x-checkbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { XTableComponent } from '../components/x-table/x-table.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule
  ],
  declarations: [
    CustomerListComponent,
    XTableComponent,
    XCheckboxComponent
  ],
  entryComponents: [
  ]
})
export class CustomersModule { }
