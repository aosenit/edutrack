import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingpageRoutingModule } from './landingpage-routing.module';
import { LandingpageComponent } from './landingpage.component';
import { DemoComponent } from './demo/demo.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { FaqsComponent } from './faqs/faqs.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LandingpageComponent,
    DemoComponent,
    AboutComponent,
    ProductsComponent,
    FaqsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LandingpageRoutingModule
  ]
})
export class LandingpageModule { }
