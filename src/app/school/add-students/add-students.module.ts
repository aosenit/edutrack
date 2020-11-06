import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStudentsRoutingModule } from './add-students-routing.module';
import { AddStudentsComponent } from './add-students.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { SocialDetailsComponent } from './social-details/social-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { MedicalDetailsComponent } from './medical-details/medical-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddStudentsComponent, BasicDetailsComponent, SocialDetailsComponent, ContactDetailsComponent, MedicalDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AddStudentsRoutingModule
  ]
})
export class AddStudentsModule { }
