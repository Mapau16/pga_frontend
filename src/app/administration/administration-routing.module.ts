import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationLayoutComponent } from './layout/administration-layout/administration-layout.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';

import { privateGuard } from '../auth/guards/private.guard';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { GuidelinesPageComponent } from './pages/guidelines-page/guidelines-page.component';
import { ProcessPageComponent } from './pages/process-page/process-page.component';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [privateGuard],
    component: AdministrationLayoutComponent,
    children: [
      { path: 'clients', canActivate: [privateGuard], component: ClientsPageComponent },
      { path: 'questions', canActivate: [privateGuard], component: QuestionsPageComponent },
      { path: 'guidelines', canActivate: [privateGuard], component: GuidelinesPageComponent },
      { path: 'process', canActivate: [privateGuard], component: ProcessPageComponent },
      { path: 'roles', canActivate: [privateGuard], component: RolesPageComponent },
      { path: '**', redirectTo: 'clients' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
