import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { CreateAssignmentComponent } from './create-assignment/create-assignment.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { GradingComponent } from './grading/grading.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ViewFileComponent } from './view-file/view-file.component';
import { VirtualClassComponent } from './virtual-class/virtual-class.component';
import { VirtualSessionComponent } from './virtual-session/virtual-session.component';
import { GradebookComponent } from './gradebook/gradebook.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BroadSheetComponent } from './broad-sheet/broad-sheet.component';
import { ScoreSheetComponent } from './score-sheet/score-sheet.component';
import { ScoreSheetDetailsPageComponent } from './score-sheet-details-page/score-sheet-details-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TimeTableComponent } from './time-table/time-table.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { StudentScoreSheetComponent } from './student-score-sheet/student-score-sheet.component';
import { MailReportCardComponent } from './mail-report-card/mail-report-card.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { SubjecAttendanceComponent } from './subjec-attendance/subjec-attendance.component';
import { ClassAttendanceComponent } from './class-attendance/class-attendance.component';
import { ViewReportCardComponent } from './view-report-card/view-report-card.component';


@NgModule({
  declarations: [TeacherComponent,
    DashboardComponent,
    AssignmentComponent,
    AssignmentsComponent,
    CreateAssignmentComponent,
    FileManagerComponent,
    GradingComponent,
    ScheduleComponent,
    ViewFileComponent,
    VirtualClassComponent,
    VirtualSessionComponent,
    GradebookComponent,
    BroadSheetComponent,
    ScoreSheetComponent,
    ScoreSheetDetailsPageComponent,
    TimeTableComponent,
    AttendanceComponent,
    MarkAttendanceComponent,
    StudentScoreSheetComponent,
    MailReportCardComponent,
    ReportCardComponent,
    SubjecAttendanceComponent,
    ClassAttendanceComponent,
    ViewReportCardComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
