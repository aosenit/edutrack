import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolComponent } from './school.component';
import { ParentComponent } from './parent/parent.component';
import { SchoolAdminComponent } from './school-admin/school-admin.component';
import { AddStudentsComponent } from './add-students/add-students.component';
import { ParentListComponent } from './parent-list/parent-list.component';
import { ParentDetailsComponent } from './parent-details/parent-details.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { NewRoleRecordComponent } from './new-role-record/new-role-record.component';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';
import { FinanceSettingsComponent } from './finance-settings/finance-settings.component';
import { FacilitySettingsComponent } from './facility-settings/facility-settings.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { ScheduleComponent } from './schedule/schedule.component';


@NgModule({
  declarations: [SchoolComponent,
                 ParentComponent,
                 SchoolAdminComponent,
                 AddStudentsComponent,
                 ParentListComponent,
                 ParentDetailsComponent,
                 AccountSettingsComponent,
                 NewRoleRecordComponent,
                 SchoolSettingsComponent,
                 PersonalSettingsComponent,
                 FinanceSettingsComponent,
                 FacilitySettingsComponent,
                 StudentListComponent,
                 StudentDetailComponent,
                 ScheduleComponent
                ],
  imports: [
    CommonModule,
    SchoolRoutingModule
  ]
})
export class SchoolModule { }
