import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { BroadSheetComponent } from './broad-sheet/broad-sheet.component';
import { CreateAssignmentComponent } from './create-assignment/create-assignment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { GradebookComponent } from './gradebook/gradebook.component';
import { GradingComponent } from './grading/grading.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScoreSheetDetailsPageComponent } from './score-sheet-details-page/score-sheet-details-page.component';
import { ScoreSheetComponent } from './score-sheet/score-sheet.component';
import { TeacherComponent } from './teacher.component';
import { ViewFileComponent } from './view-file/view-file.component';
import { VirtualClassComponent } from './virtual-class/virtual-class.component';
import { VirtualSessionComponent } from './virtual-session/virtual-session.component';


const routes: Routes = [
  {
    path: '', component: TeacherComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'grade-assignment', component: GradingComponent },
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
      { path: 'score-sheet-student', component: ScoreSheetDetailsPageComponent },
      { path: 'broad-sheet', component: BroadSheetComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
