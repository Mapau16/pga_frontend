import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationLayoutComponent } from './layout/administration-layout/administration-layout.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';

import { isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    component: AdministrationLayoutComponent,
    children: [
      { path: 'clients', canActivate: [isAuthenticatedGuard], component: ClientsPageComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
