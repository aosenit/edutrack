import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/services/guards/auth-guard.guard';
import { TeacherGuard } from 'src/services/guards/teacher.guard';
import { AssignmentComponent } from './assignment/assignment.component';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileStorageComponent } from './file-storage/file-storage.component';
import { FilesComponent } from './files/files.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { SessionComponent } from './session/session.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentReportComponent } from './student-report/student-report.component';
import { StudentComponent } from './student.component';
import { TaskPreviewComponent } from './task-preview/task-preview.component';
import { VirtualClassroomComponent } from './virtual-classroom/virtual-classroom.component';


const routes: Routes = [
  {path: '', component: StudentComponent, canActivate: [AuthGuardGuard], canActivateChild: [TeacherGuard],
   children: [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'dashboard', component: DashboardComponent },
    {path: 'start-class', component: VirtualClassroomComponent},
    {path: 'session', component: SessionComponent},
    {path: 'attendance', component: StudentAttendanceComponent},
    {path: 'assignment', component: AssignmentComponent},
    {path: 'report-sheet', component: StudentReportComponent},
    {path: 'schedule', component: ClassScheduleComponent},
    {path: 'file-manager', component: FileManagerComponent},
    {path: 'files', component: FilesComponent},
    {path: 'profile', component: StudentProfileComponent},
    {path: 'notification/:id', component: NotificationPageComponent},
    {path: 'preview/:id', component: TaskPreviewComponent},
    {path: 'file-storage/:id', component: FileStorageComponent},
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
