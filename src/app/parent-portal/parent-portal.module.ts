import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentPortalRoutingModule } from './parent-portal-routing.module';
import { ParentPortalComponent } from './parent-portal.component';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChildAssignmentComponent } from './child-assignment/child-assignment.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { BillingComponent } from './billing/billing.component';


@NgModule({
  declarations: [ParentPortalComponent, LandingScreenComponent, DashboardComponent, ChildAssignmentComponent, TimeTableComponent, BillingComponent],
  imports: [
    CommonModule,
    ParentPortalRoutingModule
  ]
})
export class ParentPortalModule { }
