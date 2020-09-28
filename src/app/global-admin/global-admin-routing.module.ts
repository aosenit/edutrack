import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { GlobalAdminComponent } from './global-admin.component';
import { NewClientComponent } from './new-client/new-client.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '', component: GlobalAdminComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'newclient', component: NewClientComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'client', component: ClientDetailComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user', component: EditUserComponent },
      { path: 'newuser', component: NewUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalAdminRoutingModule { }
