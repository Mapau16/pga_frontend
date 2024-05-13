import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationLayoutComponent } from './layout/administration-layout/administration-layout.component';
import { MaterialModule } from '../material/material.module';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { ClientsDialogComponent } from './pages/clients-page/clients-dialog/clients-dialog.component';



@NgModule({
  declarations: [
    AdministrationLayoutComponent,
    ClientsPageComponent,
    ClientsDialogComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class AdministrationModule { }
