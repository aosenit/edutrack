import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountMappingComponent } from './account-mapping/account-mapping.component';
import { AccountPanelComponent } from './account-panel/account-panel.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { ChartOfAccountComponent } from './chart-of-account/chart-of-account.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { FeeComponentComponent } from './fee-component/fee-component.component';
import { FeeTypeComponent } from './fee-type/fee-type.component';
import { FeeComponent } from './fee/fee.component';
import { NewAccountChartComponent } from './new-account-chart/new-account-chart.component';
import { NewFeeComponent } from './new-fee/new-fee.component';
import { NewVendorsComponent } from './new-vendors/new-vendors.component';
import { PayrollAccountsComponent } from './payroll-accounts/payroll-accounts.component';
import { VendorsComponent } from './vendors/vendors.component';


const routes: Routes = [
  {path: 'accounts', component: AccountPanelComponent},
  {path: 'chart-of-account', component: ChartOfAccountComponent},
  {path: 'new-account-chart', component: NewAccountChartComponent},
  {path: 'edit-account-chart/:id', component: NewAccountChartComponent},
  {path: 'fee-component', component: FeeComponentComponent},
  {path: 'fee', component: FeeComponent},
  {path: 'new-fee', component: NewFeeComponent},
  {path: 'fee-type', component: FeeTypeComponent},
  {path: 'vendors', component: VendorsComponent},
  {path: 'new-vendor', component: NewVendorsComponent},
  {path: 'discount', component: DiscountsComponent},
  {path: 'bank-account', component: BankAccountsComponent},
  {path: 'payroll-account', component: PayrollAccountsComponent},
  {path: 'account-mapping', component: AccountMappingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceSettingRoutingModule { }
