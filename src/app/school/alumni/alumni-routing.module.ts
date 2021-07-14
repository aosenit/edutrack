import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumniProfileComponent } from './alumni-profile/alumni-profile.component';
import { AlumniComponent } from './alumni.component';


const routes: Routes = [
  {path: '', component: AlumniComponent},
  {path: 'profile', component: AlumniProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumniRoutingModule { }
