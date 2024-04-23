import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupedSchoolsComponent } from './grouped-schools.component';


const routes: Routes = [
  {path: '', component: GroupedSchoolsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupedSchoolsRoutingModule { }
