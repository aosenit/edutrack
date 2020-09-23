import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrialComponent } from './trial.component';


const routes: Routes = [
  {path: '', component: TrialComponent,
    children: [
    {
      path: 'admin',
      loadChildren: () =>
        import('./admin/admin.module').then(
          (m) => m.AdminModule
        )
    },
    {
      path: 'teacher',
      loadChildren: () =>
        import('./teacher/teacher.module').then(
          (m) => m.TeacherModule
        )
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrialRoutingModule { }
