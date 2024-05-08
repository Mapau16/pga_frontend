import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

import { isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    component: DashboardLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
