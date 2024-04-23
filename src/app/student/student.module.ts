import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './student.component';
import { VirtualClassroomComponent } from './virtual-classroom/virtual-classroom.component';
import { SessionComponent } from './session/session.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FilesComponent } from './files/files.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { TaskPreviewComponent } from './task-preview/task-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from '../shared/shared.module';
import { FileStorageComponent } from './file-storage/file-storage.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StudentReportComponent } from './student-report/student-report.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StudentComponent,
    VirtualClassroomComponent,
    SessionComponent,
    AssignmentComponent,
    ClassScheduleComponent,
    FileManagerComponent,
    FilesComponent,
    StudentProfileComponent,
    NotificationPageComponent,
    TaskPreviewComponent,
    FileStorageComponent,
    StudentAttendanceComponent,
    StudentReportComponent,
    ReportComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
