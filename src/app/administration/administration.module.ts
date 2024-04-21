import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationLayoutComponent } from './layout/administration-layout/administration-layout.component';


@NgModule({
  declarations: [
    AdministrationLayoutComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
