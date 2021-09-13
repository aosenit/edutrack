import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SettingsRoutingModule } from './settings-routing.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { FacilitySettingsComponent } from './facility-settings/facility-settings.component';
import { FinanceSettingsComponent } from './finance-settings/finance-settings.component';
import { PayrollSetttingsComponent } from './payroll-setttings/payroll-setttings.component';
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';
import { ResultSettingsComponent } from './result-settings/result-settings.component';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';
import { StudentSettingsComponent } from './student-settings/student-settings.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewRoleRecordComponent } from './new-role-record/new-role-record.component';
import { SchoolManagerSettingsComponent } from './school-manager-settings/school-manager-settings.component';
import { SchoolManagerComponent } from './school-manager/school-manager.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PromotionSettingsComponent } from './promotion-settings/promotion-settings.component';


@NgModule({
  declarations: [
    AccountSettingsComponent,
    SchoolSettingsComponent,
    PersonalSettingsComponent,
    FinanceSettingsComponent,
    FacilitySettingsComponent,
    ResultSettingsComponent,
    StudentSettingsComponent,
    PayrollSetttingsComponent,
    NewRoleRecordComponent,
    SchoolManagerComponent,
    SchoolManagerSettingsComponent,
    PromotionSettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DragDropModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
