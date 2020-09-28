import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DemoComponent } from './demo/demo.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { FaqsComponent } from './faqs/faqs.component';


const routes: Routes = [
  {path: '', component: LandingpageComponent},
  {path: 'demo', component: DemoComponent},
  {path: 'aboutus', component: AboutComponent},
  {path: 'productfeatures', component: ProductsComponent},
  {path: 'FAQs', component: FaqsComponent},
  {path: '', loadChildren: () => import('./authentication/authentication.module').then(m=>m.AuthenticationModule)},
  {path: 'admin', loadChildren: () => import('./global-admin/global-admin.module').then(m => m.GlobalAdminModule)},
  {path: 'school', loadChildren: () => import('./school/school.module').then(m=>m.SchoolModule)},
  {path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then(m=>m.TeacherModule)},
  {path: 'student', loadChildren: () => import('./student/student.module').then(m=>m.StudentModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
