import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { FacilitySettingsComponent } from './facility-settings/facility-settings.component';
import { FinanceSettingsComponent } from './finance-settings/finance-settings.component';
import { NewRoleRecordComponent } from './new-role-record/new-role-record.component';
import { PayrollSetttingsComponent } from './payroll-setttings/payroll-setttings.component';
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';
import { ResultSettingsComponent } from './result-settings/result-settings.component';
import { SchoolManagerSettingsComponent } from './school-manager-settings/school-manager-settings.component';
import { SchoolManagerComponent } from './school-manager/school-manager.component';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';
import { StudentSettingsComponent } from './student-settings/student-settings.component';
import { PromotionSettingsComponent } from './promotion-settings/promotion-settings.component';


const routes: Routes = [
  { path: 'account-settings', component: AccountSettingsComponent },
  { path: 'school-settings', component: SchoolSettingsComponent },
  { path: 'personal-settings', component: PersonalSettingsComponent },
  { path: 'finance-settings', component: FinanceSettingsComponent },
  { path: 'facility-settings', component: FacilitySettingsComponent },
  { path: 'result-settings', component: ResultSettingsComponent },
  { path: 'student-settings', component: StudentSettingsComponent },
  { path: 'payroll-settings', component: PayrollSetttingsComponent },
  { path: 'role-permissions', component: NewRoleRecordComponent },
  { path: 'edit-role-permission/:id', component: NewRoleRecordComponent },
  { path: 'school-manager', component: SchoolManagerComponent },
  { path: 'school-manager-settings', component: SchoolManagerSettingsComponent },
  { path: 'promotion-settings', component: PromotionSettingsComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
