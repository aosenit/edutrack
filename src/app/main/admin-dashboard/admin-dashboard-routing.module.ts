import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes: Routes = [
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {path: 'admin', component: HomeComponent},
  {path: 'client', component: ClientComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'client-detail', component: ClientDetailComponent},
  {path: 'user-role', component: UsersComponent},
  {path: 'new-user', component: NewUserComponent},
  {path: 'edit-user', component: EditUserComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
