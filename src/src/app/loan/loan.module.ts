import { XTableComponent } from "./../components/x-table/x-table.component";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoanRoutingModule } from "./loan-routing.module";
import { LoanComponent } from "./loan/loan.component";
import { XCheckboxComponent } from "../components/x-checkbox/x-checkbox.component";
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { LoanViewComponent } from './loan-view/loan-view.component';
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  declarations: [LoanComponent, LoanDetailsComponent, LoanViewComponent],
  imports: [CommonModule, LoanRoutingModule, SharedModule,MatGridListModule],
})
export class LoanModule {}
