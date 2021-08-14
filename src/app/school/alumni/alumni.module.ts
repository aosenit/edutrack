import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumniRoutingModule } from './alumni-routing.module';
import { AlumniComponent } from './alumni.component';
import { AlumniProfileComponent } from './alumni-profile/alumni-profile.component';
import { AlumniHomeComponent } from './alumni-home/alumni-home.component';
import { AlumniRecordsComponent } from './alumni-records/alumni-records.component';
import { AlumniEventsComponent } from './alumni-events/alumni-events.component';
import { AlumniTranscriptComponent } from './alumni-transcript/alumni-transcript.component';
import { AlumniAlumniComponent } from './alumni-alumni/alumni-alumni.component';
import { AlumniEventDetailComponent } from './alumni-event-detail/alumni-event-detail.component';


@NgModule({
  declarations: [AlumniComponent, AlumniProfileComponent, AlumniHomeComponent, AlumniRecordsComponent, AlumniEventsComponent, AlumniTranscriptComponent, AlumniAlumniComponent, AlumniEventDetailComponent],
  imports: [
    CommonModule,
    AlumniRoutingModule
  ]
})
export class AlumniModule { }
