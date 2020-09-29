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
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';
import { SchoolComponent } from './school.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentListComponent } from './student-list/student-list.component';


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
      { path: 'account/records', component: NewRoleRecordComponent},

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
