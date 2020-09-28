import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolComponent } from './school.component';
import { ParentComponent } from './parent/parent.component';
import { SchoolAdminComponent } from './school-admin/school-admin.component';


@NgModule({
  declarations: [SchoolComponent, ParentComponent, SchoolAdminComponent],
  imports: [
    CommonModule,
    SchoolRoutingModule
  ]
})
export class SchoolModule { }
