import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/services/guards/auth-guard.guard';
import { GlobalAdminGuard } from 'src/services/guards/global/global-admin.guard';
import { TeacherGuard } from 'src/services/guards/teacher.guard';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { GlobalAdminComponent } from './global-admin.component';
import { LaterThingsComponent } from './later-things/later-things.component';
import { NewClientComponent } from './new-client/new-client.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NewroleComponent } from './newrole/newrole.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '', component: GlobalAdminComponent, canActivate: [AuthGuardGuard], canActivateChild: [GlobalAdminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'newclient', component: NewClientComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'client/:id', component: ClientDetailComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user', component: EditUserComponent },
      { path: 'newuser', component: NewUserComponent },
      { path: 'edit-user/:id', component: NewUserComponent },
      { path: 'new-role', component: NewroleComponent },
      {path: 'edit-user', component: EditUserComponent},
      {path: 'coming-soon', component: LaterThingsComponent},
      // {path: 'subscription', component: SubscriptionPageComponent},
      // tslint:disable-next-line:max-line-length
      {path: 'subscription', loadChildren: () => import('./school-subscription/school-subscription.module').then(m => m.SchoolSubscriptionModule)},
      {path: 'create-client', loadChildren: () => import('./create-client/create-client.module').then(m => m.CreateClientModule)},
      {path: 'group-of-schools', loadChildren: () => import('./grouped-schools/grouped-schools.module').then(m => m.GroupedSchoolsModule)},
      {path: 'edit-client/:id', loadChildren: () => import('./create-client/create-client.module').then(m => m.CreateClientModule)},
      {path: 'reports', loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingModule)},


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalAdminRoutingModule { }
