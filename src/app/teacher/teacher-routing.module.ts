import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/services/guards/auth-guard.guard';
import { TeacherGuard } from 'src/services/guards/teacher.guard';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { BroadSheetComponent } from './broad-sheet/broad-sheet.component';
import { ClassAttendanceComponent } from './class-attendance/class-attendance.component';
import { CreateAssignmentComponent } from './create-assignment/create-assignment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { GradebookComponent } from './gradebook/gradebook.component';
import { GradingComponent } from './grading/grading.component';
import { MailReportCardComponent } from './mail-report-card/mail-report-card.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { ReportComponent } from './report/report.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScoreSheetDetailsPageComponent } from './score-sheet-details-page/score-sheet-details-page.component';
import { ScoreSheetComponent } from './score-sheet/score-sheet.component';
import { StudentScoreSheetComponent } from './student-score-sheet/student-score-sheet.component';
import { SubjecAttendanceComponent } from './subjec-attendance/subjec-attendance.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeacherComponent } from './teacher.component';
import { ViewFileComponent } from './view-file/view-file.component';
import { VirtualClassComponent } from './virtual-class/virtual-class.component';
import { VirtualSessionComponent } from './virtual-session/virtual-session.component';


const routes: Routes = [
  {
    path: '', component: TeacherComponent, canActivate: [AuthGuardGuard], canActivateChild: [TeacherGuard],
     children: [
      { path: '', component: DashboardComponent,  },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'grade-assignment/:id', component: GradingComponent },
      { path: 'preview-assignment/:id', component: GradingComponent },
      { path: 'assignments', component: AssignmentsComponent },
      { path: 'assignment-submission/:id', component: AssignmentComponent },
      { path: 'assignment/new', component: CreateAssignmentComponent },
      { path: 'filemanager', component: FileManagerComponent },
      { path: 'lesson-note/:id', component: ViewFileComponent },
      { path: 'assignment-note/:id', component: ViewFileComponent },
      { path: 'class-work/:id', component: ViewFileComponent },
      { path: 'class', component: VirtualClassComponent },
      { path: 'session', component: VirtualSessionComponent },
      { path: 'gradebook', component: GradebookComponent },
      { path: 'score-sheet', component: ScoreSheetComponent },
      { path: 'student-score-sheet', component: StudentScoreSheetComponent },
      { path: 'score-sheet-student/:id', component: ScoreSheetDetailsPageComponent },
      { path: 'broad-sheet', component: BroadSheetComponent },
      { path: 'report-card', component: ReportCardComponent },
      { path: 'mail-card', component: MailReportCardComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'subject-attendance', component: SubjecAttendanceComponent },
      { path: 'class-attendance', component: ClassAttendanceComponent },
      { path: 'mark-attendance/:id', component: MarkAttendanceComponent },
      {path: 'report', component: ReportComponent},
      {path: 'profile', component: TeacherProfileComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
