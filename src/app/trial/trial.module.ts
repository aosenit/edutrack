import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrialRoutingModule } from './trial-routing.module';
import { TrialComponent } from './trial.component';


@NgModule({
  declarations: [TrialComponent],
  imports: [
    CommonModule,
    TrialRoutingModule
  ]
})
export class TrialModule { }
