import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolComponent } from './school.component';
import { SchoolAdminComponent } from './school-admin/school-admin.component';
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
import { ResultSettingsComponent } from './result-settings/result-settings.component';
import { StudentSettingsComponent } from './student-settings/student-settings.component';
import { PayrollSetttingsComponent } from './payroll-setttings/payroll-setttings.component';
import { TeachersComponent } from './teachers/teachers.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { AttachTeacherComponent } from './attach-teacher/attach-teacher.component';
import { SchoolManagerComponent } from './school-manager/school-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { SchoolManagerSettingsComponent } from './school-manager-settings/school-manager-settings.component';
import { PeriodComponent } from './period/period.component';
import { SchoolGradeBookComponent } from './school-grade-book/school-grade-book.component';
import { StudentSheetComponent } from './student-sheet/student-sheet.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [SchoolComponent,
                 SchoolAdminComponent,
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
                 ResultSettingsComponent,
                 StudentSettingsComponent,
                 PayrollSetttingsComponent,
                 TeachersComponent,
                 EmployeeListComponent,
                 EmployeeDetailsComponent,
                 CalendarComponent,
                 TimeTableComponent,
                 AttachTeacherComponent,
                 SchoolManagerComponent,
                 DashboardComponent,
                 UsersComponent,
                 SchoolManagerSettingsComponent,
                 PeriodComponent,
                 SchoolGradeBookComponent,
                 StudentSheetComponent,
                ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    SchoolRoutingModule,

  ]
})
export class SchoolModule { }
