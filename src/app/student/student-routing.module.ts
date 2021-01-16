import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/services/guards/auth-guard.guard';
import { AssignmentComponent } from './assignment/assignment.component';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileStorageComponent } from './file-storage/file-storage.component';
import { FilesComponent } from './files/files.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { SessionComponent } from './session/session.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentComponent } from './student.component';
import { TaskPreviewComponent } from './task-preview/task-preview.component';
import { VirtualClassroomComponent } from './virtual-classroom/virtual-classroom.component';


const routes: Routes = [
  {path: '', component: StudentComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard', canActivate: [AuthGuardGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] },
    {path: 'start-class', component: VirtualClassroomComponent, canActivate: [AuthGuardGuard]},
    {path: 'session', component: SessionComponent, canActivate: [AuthGuardGuard]},
    {path: 'assignment', component: AssignmentComponent, canActivate: [AuthGuardGuard]},
    {path: 'schedule', component: ClassScheduleComponent, canActivate: [AuthGuardGuard]},
    {path: 'file-manager', component: FileManagerComponent, canActivate: [AuthGuardGuard]},
    {path: 'files', component: FilesComponent, canActivate: [AuthGuardGuard]},
    {path: 'profile', component: StudentProfileComponent, canActivate: [AuthGuardGuard]},
    {path: 'notification/:id', component: NotificationPageComponent, canActivate: [AuthGuardGuard]},
    {path: 'preview/:id', component: TaskPreviewComponent, canActivate: [AuthGuardGuard]},
    {path: 'file-storage/:id', component: FileStorageComponent, canActivate: [AuthGuardGuard]},
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
