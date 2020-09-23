import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { CreateAssignmentComponent } from './create-assignment/create-assignment.component';
import { VirtualClassComponent } from './virtual-class/virtual-class.component';
import { LoginComponent } from './login/login.component';
import { VirtualSessionComponent } from './virtual-session/virtual-session.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { GradingComponent } from './grading/grading.component';


@NgModule({
  declarations: [TeacherComponent, AssignmentComponent, TeacherDashboardComponent, ScheduleComponent, FileManagerComponent, CreateAssignmentComponent, VirtualClassComponent, LoginComponent, VirtualSessionComponent, AssignmentsComponent, GradingComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
