import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassPoolComponent } from './class-pool/class-pool.component';
import { ClassRepeatComponent } from './class-repeat/class-repeat.component';
import { PromotionDashboardComponent } from './promotion-dashboard/promotion-dashboard.component';
import { WithdrawalListComponent } from './withdrawal-list/withdrawal-list.component';


const routes: Routes = [
  {path: 'class-pool', component: ClassPoolComponent},
  {path: 'class-repeat', component: ClassRepeatComponent},
  {path: 'promotion-dashboard', component: PromotionDashboardComponent},
  {path: 'withdrawal-list', component: WithdrawalListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }
