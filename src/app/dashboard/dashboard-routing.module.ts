import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

import { privateGuard } from '../auth/guards/private.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [privateGuard],
    component: DashboardLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
