import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBranchComponent } from './create-branch.component';


const routes: Routes = [
  {path: '', component: CreateBranchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBranchRoutingModule { }
