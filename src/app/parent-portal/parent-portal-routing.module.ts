import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { ChildAssignmentComponent } from './child-assignment/child-assignment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { ParentPortalComponent } from './parent-portal.component';
import { TimeTableComponent } from './time-table/time-table.component';


const routes: Routes = [
  {path: '', component: LandingScreenComponent},
  {path: 'parent-portal', component: ParentPortalComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'assignments', component: ChildAssignmentComponent},
    {path: 'time-table', component: TimeTableComponent},
    {path: 'billing', component: BillingComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentPortalRoutingModule { }
