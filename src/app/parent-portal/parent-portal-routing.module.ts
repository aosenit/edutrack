import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { ChildAssignmentComponent } from './child-assignment/child-assignment.component';
import { ChildAttendanceComponent } from './child-attendance/child-attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { ParentPortalComponent } from './parent-portal.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';
import { ViewBillingComponent } from './view-billing/view-billing.component';
import { ViewReportCardComponent } from './view-report-card/view-report-card.component';


const routes: Routes = [
  {path: '', component: LandingScreenComponent},
  {path: 'parent-portal', component: ParentPortalComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'assignments', component: ChildAssignmentComponent},
    {path: 'view-assignment', component: ViewAssignmentComponent},
    {path: 'time-table', component: TimeTableComponent},
    {path: 'billing', component: BillingComponent},
    {path: 'view-bill', component: ViewBillingComponent},
    {path: 'attendance', component: ChildAttendanceComponent},
    {path: 'report-card', component: ReportCardComponent},
    {path: 'view-report-card', component: ViewReportCardComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentPortalRoutingModule { }
