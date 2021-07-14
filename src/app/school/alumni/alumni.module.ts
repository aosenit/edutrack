import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumniRoutingModule } from './alumni-routing.module';
import { AlumniComponent } from './alumni.component';
import { AlumniProfileComponent } from './alumni-profile/alumni-profile.component';


@NgModule({
  declarations: [AlumniComponent, AlumniProfileComponent],
  imports: [
    CommonModule,
    AlumniRoutingModule
  ]
})
export class AlumniModule { }
