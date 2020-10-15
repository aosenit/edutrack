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
    VirtualClassComponent, VirtualSessionComponent, GradebookComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
