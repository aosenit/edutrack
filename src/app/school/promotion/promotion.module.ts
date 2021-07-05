import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { ClassPoolComponent } from './class-pool/class-pool.component';
import { WithdrawalListComponent } from './withdrawal-list/withdrawal-list.component';
import { ClassRepeatComponent } from './class-repeat/class-repeat.component';
import { PromotionDashboardComponent } from './promotion-dashboard/promotion-dashboard.component';


@NgModule({
  declarations: [ClassPoolComponent, WithdrawalListComponent, ClassRepeatComponent, PromotionDashboardComponent],
  imports: [
    CommonModule,
    PromotionRoutingModule
  ]
})
export class PromotionModule { }
