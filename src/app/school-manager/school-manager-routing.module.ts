import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDetailComponent } from '../global-admin/client-detail/client-detail.component';
import { CreateClientComponent } from '../global-admin/create-client/create-client.component';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';
import { SchoolManagerBranchComponent } from './school-manager-branch/school-manager-branch.component';
import { SchoolManagerDashboardComponent } from './school-manager-dashboard/school-manager-dashboard.component';
import { SchoolBranchManagerComponent } from './school-manager.component';


const routes: Routes = [
  {
    path: '', component: SchoolBranchManagerComponent,
    children: [
      { path: '', component: SchoolManagerDashboardComponent },
      { path: 'branches', component: SchoolManagerBranchComponent },
      { path: 'school/:id', component: BranchDetailComponent },
      // tslint:disable-next-line:max-line-length
      // { path: 'create-school', loadChildren: () => import('../../app/global-admin/create-client/create-client.module').then(m => m.CreateClientModule) },
      { path: 'create-school', loadChildren: () => import('./create-branch/create-branch.module').then(m => m.CreateBranchModule) },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolManagerRoutingModule { }
