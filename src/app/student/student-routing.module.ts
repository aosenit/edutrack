import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './assignment/assignment.component';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FilesComponent } from './files/files.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { SessionComponent } from './session/session.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentComponent } from './student.component';
import { TaskPreviewComponent } from './task-preview/task-preview.component';
import { VirtualClassroomComponent } from './virtual-classroom/virtual-classroom.component';


const routes: Routes = [
  {path: '', component: StudentComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'start-class', component: VirtualClassroomComponent},
    {path: 'session', component: SessionComponent},
    {path: 'assignment', component: AssignmentComponent},
    {path: 'schedule', component: ClassScheduleComponent},
    {path: 'file-manager', component: FileManagerComponent},
    {path: 'files', component: FilesComponent},
    {path: 'profile', component: StudentProfileComponent},
    {path: 'notification', component: NotificationPageComponent},
    {path: 'preview', component: TaskPreviewComponent},
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
