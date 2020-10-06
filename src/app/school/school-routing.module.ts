import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AddStudentsComponent } from './add-students/add-students.component';
import { AttachTeacherComponent } from './attach-teacher/attach-teacher.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { FacilitySettingsComponent } from './facility-settings/facility-settings.component';
import { FinanceSettingsComponent } from './finance-settings/finance-settings.component';
import { NewRoleRecordComponent } from './new-role-record/new-role-record.component';
import { ParentDetailsComponent } from './parent-details/parent-details.component';
import { ParentListComponent } from './parent-list/parent-list.component';
import { ParentComponent } from './parent/parent.component';
import { PayrollSetttingsComponent } from './payroll-setttings/payroll-setttings.component';
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';
import { ResultSettingsComponent } from './result-settings/result-settings.component';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';
import { SchoolComponent } from './school.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentSettingsComponent } from './student-settings/student-settings.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TimeTableComponent } from './time-table/time-table.component';


const routes: Routes = [
  {
    path: '', component: SchoolComponent,
    children: [
      { path: 'add-student', component: AddStudentsComponent},
      { path: 'add-parents', component: ParentComponent},
      { path: 'students', component: StudentListComponent},
      { path: 'parents', component: ParentListComponent},
      { path: 'parent-detail', component: ParentDetailsComponent},
      { path: 'student-detail', component: StudentDetailComponent},
      { path: 'account-settings', component: AccountSettingsComponent},
      { path: 'school-settings', component: SchoolSettingsComponent},
      { path: 'personal-settings', component: PersonalSettingsComponent},
      { path: 'finance-settings', component: FinanceSettingsComponent},
      { path: 'facility-settings', component: FacilitySettingsComponent},
      { path: 'result-settings', component: ResultSettingsComponent},
      { path: 'student-settings', component: StudentSettingsComponent},
      { path: 'payroll-settings', component: PayrollSetttingsComponent},
      { path: 'records', component: NewRoleRecordComponent},
      { path: 'teacher', component: TeachersComponent},
      { path: 'employee', component: EmployeeComponent},
      { path: 'employees', component: EmployeeListComponent},
      { path: 'employee-detail', component: EmployeeDetailsComponent},
      { path: 'time-table', component: TimeTableComponent},
      { path: 'calendar', component: CalendarComponent},
      {path: 'attach-teacher', component: AttachTeacherComponent},


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
