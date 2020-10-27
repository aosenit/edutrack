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


@NgModule({
  declarations: [DashboardComponent, StudentComponent, VirtualClassroomComponent, SessionComponent, AssignmentComponent, ClassScheduleComponent, FileManagerComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
