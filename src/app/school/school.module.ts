import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolComponent } from './school.component';
import { SchoolAdminComponent } from './school-admin/school-admin.component';
import { ParentListComponent } from './parent-list/parent-list.component';
import { ParentDetailsComponent } from './parent-details/parent-details.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { TeachersComponent } from './teachers/teachers.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { AttachTeacherComponent } from './attach-teacher/attach-teacher.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { PeriodComponent } from './period/period.component';
import { SchoolGradeBookComponent } from './school-grade-book/school-grade-book.component';
import { StudentSheetComponent } from './student-sheet/student-sheet.component';
import { StudentResultSheetComponent } from './student-result-sheet/student-result-sheet.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { NgxPaginationModule } from 'ngx-pagination';

import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { NewRoleRecordComponent } from './settings/new-role-record/new-role-record.component';
import { SchoolSettingsComponent } from './settings/school-settings/school-settings.component';
import { PersonalSettingsComponent } from './settings/personal-settings/personal-settings.component';
import { FinanceSettingsComponent } from './settings/finance-settings/finance-settings.component';
import { FacilitySettingsComponent } from './settings/facility-settings/facility-settings.component';
import { SchoolManagerSettingsComponent } from './settings/school-manager-settings/school-manager-settings.component';
import { SchoolManagerComponent } from './settings/school-manager/school-manager.component';

import { ResultSettingsComponent } from './settings/result-settings/result-settings.component';
import { StudentSettingsComponent } from './settings/student-settings/student-settings.component';
import { PayrollSetttingsComponent } from './settings/payroll-setttings/payroll-setttings.component';
import { AdminAlumniCreateEventComponent } from './alumni/admin-alumni-create-event/admin-alumni-create-event.component';
import { AdminAlumniEventsComponent } from './alumni/admin-alumni-events/admin-alumni-events.component';
import { AdminAlumniListComponent } from './alumni/admin-alumni-list/admin-alumni-list.component';
import { AdminAddAlumniComponent } from './alumni/admin-add-alumni/admin-add-alumni.component';
@NgModule({
  declarations: [SchoolComponent,
                 SchoolAdminComponent,
                 ParentListComponent,
                 ParentDetailsComponent,
                 StudentListComponent,
                 StudentDetailComponent,
                 TeachersComponent,
                 EmployeeListComponent,
                 EmployeeDetailsComponent,
                 CalendarComponent,
                 TimeTableComponent,
                 AttachTeacherComponent,
                 DashboardComponent,
                 UsersComponent,
                 PeriodComponent,
                 SchoolGradeBookComponent,
                 StudentSheetComponent,
                 StudentResultSheetComponent,
                 ComingSoonComponent,
                 AdminAlumniCreateEventComponent,
                 AdminAlumniEventsComponent,
                 AdminAlumniListComponent,
                 AdminAddAlumniComponent
                 //  AccountSettingsComponent,
                 //  NewRoleRecordComponent,
                 //  SchoolSettingsComponent,
                 //  PersonalSettingsComponent,
                 //  FinanceSettingsComponent,
                 //  FacilitySettingsComponent,
                //  ResultSettingsComponent,
                //  StudentSettingsComponent,
                //  PayrollSetttingsComponent,
                //  SchoolManagerComponent,
                //  SchoolManagerSettingsComponent,
                ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    // CalendarModule,

    NgMultiSelectDropDownModule.forRoot(),
    SchoolRoutingModule,

  ]
})
export class SchoolModule { }
