import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { BillingComponent } from './billing/billing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BillingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
