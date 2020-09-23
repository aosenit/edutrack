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
  {path: '', loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)},
  {path: 'main', loadChildren: () => import('./main/main.module').then(m=>m.MainModule)},
  {path: 'test', loadChildren: () => import('./trial/trial.module').then(m=>m.TrialModule)},
  {path: 'student', loadChildren: () => import('./student/student.module').then(m=>m.StudentModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
