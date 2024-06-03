import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministrationRoutingModule } from './administration-routing.module';
import { MaterialModule } from '../material/material.module';

import { AdministrationLayoutComponent } from './layout/administration-layout/administration-layout.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { ClientsDialogComponent } from './pages/clients-page/clients-dialog/clients-dialog.component';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { QuestionsDialogComponent } from './pages/questions-page/questions-dialog/questions-dialog.component';
import { GuidelinesPageComponent } from './pages/guidelines-page/guidelines-page.component';
import { GuidelinesDialogComponent } from './pages/guidelines-page/guidelines-dialog/guidelines-dialog.component';
import { ProcessPageComponent } from './pages/process-page/process-page.component';
import { ProcessDialogComponent } from './pages/process-page/process-dialog/process-dialog.component';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { RolesDialogComponent } from './pages/roles-page/roles-dialog/roles-dialog.component';
import { CriterioPageComponent } from './pages/criterio-page/criterio-page.component';
import { CriterioDialogComponent } from './pages/criterio-page/criterio-dialog/dialog/criterio-dialog.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CriterioDialogTableComponent } from './pages/criterio-page/criterio-dialog/dialog-table/criterio-dialog-table.component';
import { DialogFormComponent } from './pages/criterio-page/criterio-dialog/dialog-form/dialog-form.component';



@NgModule({
  declarations: [
    AdministrationLayoutComponent,
    ClientsPageComponent,
    ClientsDialogComponent,
    QuestionsPageComponent,
    QuestionsDialogComponent,
    GuidelinesPageComponent,
    GuidelinesDialogComponent,
    ProcessPageComponent,
    ProcessDialogComponent,
    RolesPageComponent,
    RolesDialogComponent,
    CriterioPageComponent,
    CriterioDialogComponent,
    AutocompleteComponent,
    CriterioDialogTableComponent,
    DialogFormComponent
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
