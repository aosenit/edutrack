import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './student.component';
import { VirtualClassroomComponent } from './virtual-classroom/virtual-classroom.component';
import { SessionComponent } from './session/session.component';


@NgModule({
  declarations: [DashboardComponent, StudentComponent, VirtualClassroomComponent, SessionComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
