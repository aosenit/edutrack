import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './assignment/assignment.component';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SessionComponent } from './session/session.component';
import { StudentComponent } from './student.component';
import { VirtualClassroomComponent } from './virtual-classroom/virtual-classroom.component';


const routes: Routes = [
  {path: '', component: StudentComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'start-class', component: VirtualClassroomComponent},
    {path: 'session', component: SessionComponent},
    {path: 'assignment', component: AssignmentComponent},
    {path: 'schedule', component: ClassScheduleComponent},
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
