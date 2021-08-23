import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolManagerBranchComponent } from './school-manager-branch/school-manager-branch.component';
import { SchoolManagerDashboardComponent } from './school-manager-dashboard/school-manager-dashboard.component';
import { SchoolManagerComponent } from './school-manager.component';


const routes: Routes = [
  {
    path: '', component: SchoolManagerComponent,
    children: [
      { path: '', component: SchoolManagerDashboardComponent },
      { path: 'branch', component: SchoolManagerBranchComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolManagerRoutingModule { }
