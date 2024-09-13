import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxChartsModule,
  ]
})
export class DashboardModule { }
