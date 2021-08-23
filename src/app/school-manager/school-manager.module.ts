import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolManagerRoutingModule } from './school-manager-routing.module';
import { SchoolManagerDashboardComponent } from './school-manager-dashboard/school-manager-dashboard.component';
import { SchoolManagerBranchComponent } from './school-manager-branch/school-manager-branch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SchoolManagerDashboardComponent, SchoolManagerBranchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    SchoolManagerRoutingModule
  ]
})
export class SchoolManagerModule { }
