import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolSubscriptionRoutingModule } from './school-subscription-routing.module';
import { SubscriptionPageComponent } from './subscription-page/subscription-page.component';
import { SubscriptionListsComponent } from './subscription-lists/subscription-lists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubscriptionInvoiceComponent } from './subscription-invoice/subscription-invoice.component';


@NgModule({
  declarations: [SubscriptionPageComponent, SubscriptionListsComponent, SubscriptionInvoiceComponent],
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
