import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumniAlumniComponent } from './alumni-alumni/alumni-alumni.component';
import { AlumniEventDetailComponent } from './alumni-event-detail/alumni-event-detail.component';
import { AlumniEventsComponent } from './alumni-events/alumni-events.component';
import { AlumniHomeComponent } from './alumni-home/alumni-home.component';
import { AlumniProfileComponent } from './alumni-profile/alumni-profile.component';
import { AlumniRecordsComponent } from './alumni-records/alumni-records.component';
import { AlumniTranscriptComponent } from './alumni-transcript/alumni-transcript.component';
import { AlumniComponent } from './alumni.component';


const routes: Routes = [
  {path: '', component: AlumniComponent, children: [
    {path: '', component: AlumniHomeComponent},
    {path: 'profile', component: AlumniProfileComponent},
    {path: 'alumni', component: AlumniAlumniComponent},
    {path: 'events', component: AlumniEventsComponent},
    {path: 'transcript', component: AlumniTranscriptComponent},
    {path: 'records', component: AlumniRecordsComponent},
    {path: 'event-detail/:id', component: AlumniEventDetailComponent}

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumniRoutingModule { }
