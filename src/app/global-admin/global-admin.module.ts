import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalAdminRoutingModule } from './global-admin-routing.module';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NewClientComponent } from './new-client/new-client.component';
import { UsersComponent } from './users/users.component';
import { GlobalAdminComponent } from './global-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewroleComponent } from './newrole/newrole.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClientDetailComponent,
    ClientsComponent,
    DashboardComponent,
    EditUserComponent,
    NewUserComponent,
    NewClientComponent,
    UsersComponent,
    GlobalAdminComponent,
    NewroleComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    GlobalAdminRoutingModule
  ]
})
export class GlobalAdminModule { }
