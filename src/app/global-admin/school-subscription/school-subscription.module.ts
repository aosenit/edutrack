import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolSubscriptionRoutingModule } from './school-subscription-routing.module';
import { SubscriptionPageComponent } from './subscription-page/subscription-page.component';
import { SubscriptionListsComponent } from './subscription-lists/subscription-lists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubscriptionInvoiceComponent } from './subscription-invoice/subscription-invoice.component';
import { SubscriptionInvoiceArreasComponent } from './subscription-invoice-arreas/subscription-invoice-arreas.component';
import { UnpaidSubscriptionsComponent } from './unpaid-subscriptions/unpaid-subscriptions.component';


@NgModule({
  declarations: [SubscriptionPageComponent, SubscriptionListsComponent, SubscriptionInvoiceComponent, SubscriptionInvoiceArreasComponent, UnpaidSubscriptionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),

    SchoolSubscriptionRoutingModule
  ]
})
export class SchoolSubscriptionModule { }
