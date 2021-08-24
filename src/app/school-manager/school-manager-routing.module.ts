import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateClientComponent } from '../global-admin/create-client/create-client.component';
import { SchoolManagerBranchComponent } from './school-manager-branch/school-manager-branch.component';
import { SchoolManagerDashboardComponent } from './school-manager-dashboard/school-manager-dashboard.component';
import { SchoolManagerComponent } from './school-manager.component';


const routes: Routes = [
  {
    path: '', component: SchoolManagerComponent,
    children: [
      { path: '', component: SchoolManagerDashboardComponent },
      { path: 'branches', component: SchoolManagerBranchComponent },
      // tslint:disable-next-line:max-line-length
      {path: 'create-school', loadChildren: () => import('../../app/global-admin/create-client/create-client.module').then(m => m.CreateClientModule)},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolManagerRoutingModule { }
