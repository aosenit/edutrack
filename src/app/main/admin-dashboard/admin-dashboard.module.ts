import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [HomeComponent,
    ClientComponent, ClientsComponent,
    ClientDetailComponent, UsersComponent,
    NewUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
