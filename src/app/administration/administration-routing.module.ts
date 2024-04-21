import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationLayoutComponent } from './layout/administration-layout/administration-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
