import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { NextOfKinComponent } from './next-of-kin/next-of-kin.component';
import { EducationComponent } from './education/education.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    PersonalInformationComponent,
    EmployeeDetailsComponent, ContactDetailsComponent,
    NextOfKinComponent,
    EducationComponent,
    WorkExperienceComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
