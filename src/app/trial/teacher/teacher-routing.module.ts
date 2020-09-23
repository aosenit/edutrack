import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { CreateAssignmentComponent } from './create-assignment/create-assignment.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { GradingComponent } from './grading/grading.component';
import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';
import { VirtualClassComponent } from './virtual-class/virtual-class.component';
import { VirtualSessionComponent } from './virtual-session/virtual-session.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: TeacherComponent, children: [
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: TeacherDashboardComponent },
  {path: 'assignment', component: AssignmentComponent},
  {path: 'assignment/new-assignment', component: CreateAssignmentComponent},
  {path: 'assignment/grading', component: GradingComponent},
  {path: 'assignments', component: AssignmentsComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'file-manager', component: FileManagerComponent},
  {path: 'start-class', component: VirtualClassComponent},
  {path: 'session', component: VirtualSessionComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
