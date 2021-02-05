import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';

import { GlobalAdminRoutingModule } from './global-admin-routing.module';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NewClientComponent } from './new-client/new-client.component';
import { UsersComponent } from './users/users.component';
import { GlobalAdminComponent } from './global-admin.component';
import { NewroleComponent } from './newrole/newrole.component';
import { LaterThingsComponent } from './later-things/later-things.component';


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
    NewroleComponent,
    LaterThingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    GlobalAdminRoutingModule
  ]
})
export class GlobalAdminModule { }
