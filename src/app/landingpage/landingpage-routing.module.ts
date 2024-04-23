import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DemoComponent } from './demo/demo.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ProductsComponent } from './products/products.component';
import { LandingpageComponent } from './landingpage.component';


const routes: Routes = [
  {path: '', component: LandingpageComponent},
  {path: 'demo', component: DemoComponent},
  {path: 'about-us', component: AboutComponent},
  {path: 'product-features', component: ProductsComponent},
  {path: 'FAQs', component: FaqsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingpageRoutingModule { }
