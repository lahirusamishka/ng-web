import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRoutingModule } from './my-routing.module';
import { MyComponent } from './my/my.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';


@NgModule({
  declarations: [MyComponent],
  imports: [
    CommonModule,
    MyRoutingModule,
    SharedModule,
  ]
})
export class MyModule { }