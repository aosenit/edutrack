import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AddStudentsComponent } from './add-students/add-students.component';
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

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
