import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionInvoiceComponent } from './subscription-invoice/subscription-invoice.component';
import { SubscriptionListsComponent } from './subscription-lists/subscription-lists.component';
import { SubscriptionPageComponent } from './subscription-page/subscription-page.component';


const routes: Routes = [
  {path : '', component: SubscriptionListsComponent},
  {path : 'new-subscription', component: SubscriptionPageComponent},
  {path : 'invoice', component: SubscriptionInvoiceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolSubscriptionRoutingModule { }
