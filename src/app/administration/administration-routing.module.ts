import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationLayoutComponent } from './layout/administration-layout/administration-layout.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';

import { isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { GuidelinesPageComponent } from './pages/guidelines-page/guidelines-page.component';
import { ProcessPageComponent } from './pages/process-page/process-page.component';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    component: AdministrationLayoutComponent,
    children: [
      { path: 'clients', canActivate: [isAuthenticatedGuard], component: ClientsPageComponent },
      { path: 'questions', canActivate: [isAuthenticatedGuard], component: QuestionsPageComponent },
      { path: 'guidelines', canActivate: [isAuthenticatedGuard], component: GuidelinesPageComponent },
      { path: 'process', canActivate: [isAuthenticatedGuard], component: ProcessPageComponent },
      { path: 'roles', canActivate: [isAuthenticatedGuard], component: RolesPageComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
