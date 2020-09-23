import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [
  {path: '', component: MainComponent,
    children: [
      {
        path: 'admin-dashboard',
        loadChildren: () =>
          import('./admin-dashboard/admin-dashboard.module').then(
            (m) => m.AdminDashboardModule
          )
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
