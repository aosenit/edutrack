import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionInvoiceArreasComponent } from './subscription-invoice-arreas/subscription-invoice-arreas.component';
import { SubscriptionInvoiceComponent } from './subscription-invoice/subscription-invoice.component';
import { SubscriptionListsComponent } from './subscription-lists/subscription-lists.component';
import { SubscriptionPageComponent } from './subscription-page/subscription-page.component';
import { UnpaidSubscriptionsComponent } from './unpaid-subscriptions/unpaid-subscriptions.component';


const routes: Routes = [
  {path : '', component: SubscriptionListsComponent},
  {path : 'new-subscription', component: SubscriptionPageComponent},
  {path : 'invoice/:id', component: SubscriptionInvoiceComponent},
  {path : 'invoice-arrears/:id', component: SubscriptionInvoiceArreasComponent},
  {path : 'unpaid-invoice/:id', component: UnpaidSubscriptionsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolSubscriptionRoutingModule { }
