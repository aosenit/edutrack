import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupedSchoolsRoutingModule } from './grouped-schools-routing.module';
import { GroupedSchoolsComponent } from './grouped-schools.component';
import { SchoolInformationComponent } from './school-information/school-information.component';
import { SchoolContactPersonComponent } from './school-contact-person/school-contact-person.component';
import { SchoolMediaComponent } from './school-media/school-media.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GroupedSchoolsComponent, SchoolInformationComponent, SchoolContactPersonComponent, SchoolMediaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GroupedSchoolsRoutingModule
  ]
})
export class GroupedSchoolsModule { }
