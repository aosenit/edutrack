import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path: '', loadChildren: () => import('./landingpage/landingpage.module').then(m => m.LandingpageModule)},
  {path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: 'admin', loadChildren: () => import('./global-admin/global-admin.module').then(m => m.GlobalAdminModule)},
  {path: 'school', loadChildren: () => import('./school/school.module').then(m => m.SchoolModule)},
  {path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)},
  {path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule)},
  {path: 'parent', loadChildren: () => import('./parent-portal/parent-portal.module').then(m => m.ParentPortalModule)},
  {path: 'school-manager', loadChildren: () => import('./school-manager/school-manager.module').then(m => m.SchoolManagerModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
