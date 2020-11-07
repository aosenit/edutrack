import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentComponent } from './parent.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { SocialDetailsComponent } from './social-details/social-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ParentComponent, BasicDetailsComponent, SocialDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ParentRoutingModule
  ]
})
export class ParentModule { }
