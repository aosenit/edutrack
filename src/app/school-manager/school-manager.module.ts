import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolManagerRoutingModule } from './school-manager-routing.module';
import { SchoolManagerDashboardComponent } from './school-manager-dashboard/school-manager-dashboard.component';
import { SchoolManagerBranchComponent } from './school-manager-branch/school-manager-branch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';
import { SchoolBranchManagerComponent } from './school-manager.component';

@NgModule({
  declarations: [
    SchoolBranchManagerComponent,
    SchoolManagerDashboardComponent,
    SchoolManagerBranchComponent,
    BranchDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    SchoolManagerRoutingModule
  ]
})
export class SchoolBranchManagerModule { }
