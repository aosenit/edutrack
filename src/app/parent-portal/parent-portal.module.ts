import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentPortalRoutingModule } from './parent-portal-routing.module';
import { ParentPortalComponent } from './parent-portal.component';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChildAssignmentComponent } from './child-assignment/child-assignment.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { BillingComponent } from './billing/billing.component';
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { ChildAttendanceComponent } from './child-attendance/child-attendance.component';
import { ViewBillingComponent } from './view-billing/view-billing.component';
import { ViewReportCardComponent } from './view-report-card/view-report-card.component';
import { SharedModule } from '../shared/shared.module';
import { ViewReportSheetComponent } from './view-report-sheet/view-report-sheet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ParentPortalComponent,
    LandingScreenComponent,
    DashboardComponent,
    ChildAssignmentComponent,
    TimeTableComponent,
    BillingComponent,
    ViewAssignmentComponent,
    ReportCardComponent,
    ChildAttendanceComponent,
    ViewBillingComponent,
    ViewReportCardComponent,
    ViewReportSheetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ParentPortalRoutingModule
  ]
})
export class ParentPortalModule { }
