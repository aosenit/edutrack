import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/services/guards/auth-guard.guard';
import { TeacherGuard } from 'src/services/guards/teacher.guard';
import { AttachTeacherComponent } from './attach-teacher/attach-teacher.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ParentDetailsComponent } from './parent-details/parent-details.component';
import { ParentListComponent } from './parent-list/parent-list.component';
import { PeriodComponent } from './period/period.component';
import { SchoolGradeBookComponent } from './school-grade-book/school-grade-book.component';
import { SchoolComponent } from './school.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentSheetComponent } from './student-sheet/student-sheet.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { UsersComponent } from './users/users.component';

import { FacilitySettingsComponent } from './settings/facility-settings/facility-settings.component';
import { StudentSettingsComponent } from './settings/student-settings/student-settings.component';
import { ResultSettingsComponent } from './settings/result-settings/result-settings.component';
import { SchoolManagerComponent } from './settings/school-manager/school-manager.component';
import { SchoolSettingsComponent } from './settings/school-settings/school-settings.component';
import { PayrollSetttingsComponent } from './settings/payroll-setttings/payroll-setttings.component';
import { PersonalSettingsComponent } from './settings/personal-settings/personal-settings.component';
import { FinanceSettingsComponent } from './settings/finance-settings/finance-settings.component';
import { NewRoleRecordComponent } from './settings/new-role-record/new-role-record.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { SchoolManagerSettingsComponent } from './settings/school-manager-settings/school-manager-settings.component';

const routes: Routes = [
  {
    path: '', component: SchoolComponent, canActivate: [AuthGuardGuard], canActivateChild: [TeacherGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'students', component: StudentListComponent },
      { path: 'parents', component: ParentListComponent },
      { path: 'parent-detail/:id', component: ParentDetailsComponent },
      { path: 'student-detail/:id', component: StudentDetailComponent },
      { path: 'teacher', component: TeachersComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employee-detail/:id', component: EmployeeDetailsComponent },
      { path: 'time-table', component: TimeTableComponent },
      { path: 'period', component: PeriodComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'attach-teacher/:id', component: AttachTeacherComponent },
      { path: 'user', component: UsersComponent },
      { path: 'coming-soon', component: ComingSoonComponent },
      { path: 'grade-book', component: SchoolGradeBookComponent },
      { path: 'student-sheet/:id', component: StudentSheetComponent },
      { path: 'add-student', loadChildren: () => import('./add-students/add-students.module').then(m => m.AddStudentsModule) },
      { path: 'edit-student/:id', loadChildren: () => import('./add-students/add-students.module').then(m => m.AddStudentsModule) },
      { path: 'add-parents', loadChildren: () => import('./parent/parent.module').then(m => m.ParentModule) },
      { path: 'edit-parent/:id', loadChildren: () => import('./parent/parent.module').then(m => m.ParentModule) },
      { path: 'add-employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
      { path: 'edit-employee/:id', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
      { path: 'finance-setting', loadChildren: () => import('./finance-setting/finance-setting.module').then(m => m.FinanceSettingModule) },
      { path: 'finance', loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule) },
      { path: 'promotion', loadChildren: () => import('./promotion/promotion.module').then(m => m.PromotionModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },

      // { path: 'account-settings', component: AccountSettingsComponent },
      // { path: 'school-settings', component: SchoolSettingsComponent },
      // { path: 'personal-settings', component: PersonalSettingsComponent },
      // { path: 'finance-settings', component: FinanceSettingsComponent },
      // { path: 'facility-settings', component: FacilitySettingsComponent },
      // { path: 'result-settings', component: ResultSettingsComponent },
      // { path: 'student-settings', component: StudentSettingsComponent },
      // { path: 'payroll-settings', component: PayrollSetttingsComponent },
      // { path: 'role-permissions', component: NewRoleRecordComponent },
      // { path: 'edit-role-permission/:id', component: NewRoleRecordComponent },
      // { path: 'school-manager', component: SchoolManagerComponent },
      // { path: 'school-manager-settings', component: SchoolManagerSettingsComponent },



    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
