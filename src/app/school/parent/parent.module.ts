import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentComponent } from './parent.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { SocialDetailsComponent } from './social-details/social-details.component';


@NgModule({
  declarations: [ParentComponent, BasicDetailsComponent, SocialDetailsComponent],
  imports: [
    CommonModule,
    ParentRoutingModule
  ]
})
export class ParentModule { }
