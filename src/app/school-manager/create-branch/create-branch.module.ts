import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBranchRoutingModule } from './create-branch-routing.module';
import { CreateBranchComponent } from './create-branch.component';
import { BranchInformationComponent } from './branch-information/branch-information.component';
import { BranchLocationComponent } from './branch-location/branch-location.component';
import { BranchContactPersonComponent } from './branch-contact-person/branch-contact-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateBranchComponent, BranchInformationComponent, BranchLocationComponent, BranchContactPersonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateBranchRoutingModule
  ]
})
export class CreateBranchModule { }
