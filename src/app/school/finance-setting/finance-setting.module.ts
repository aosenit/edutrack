import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceSettingRoutingModule } from './finance-setting-routing.module';
import { ChartOfAccountComponent } from './chart-of-account/chart-of-account.component';
import { FeeComponentComponent } from './fee-component/fee-component.component';
import { FeeComponent } from './fee/fee.component';
import { FeeTypeComponent } from './fee-type/fee-type.component';
import { VendorsComponent } from './vendors/vendors.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { PayrollAccountsComponent } from './payroll-accounts/payroll-accounts.component';
import { AccountMappingComponent } from './account-mapping/account-mapping.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewAccountChartComponent } from './new-account-chart/new-account-chart.component';
import { NewVendorsComponent } from './new-vendors/new-vendors.component';
import { NewFeeComponent } from './new-fee/new-fee.component';
import { AccountPanelComponent } from './account-panel/account-panel.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    ChartOfAccountComponent,
    FeeComponentComponent,
    FeeComponent,
    FeeTypeComponent,
    VendorsComponent,
    DiscountsComponent,
    BankAccountsComponent,
    PayrollAccountsComponent,
    AccountMappingComponent,
    NewAccountChartComponent,
    NewVendorsComponent,
    NewFeeComponent,
    AccountPanelComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    FinanceSettingRoutingModule
  ]
})
export class FinanceSettingModule { }
