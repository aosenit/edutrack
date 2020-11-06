import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DemoComponent } from './demo/demo.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from 'src/services/interceptors/interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    DemoComponent,
    AboutComponent,
    ProductsComponent,
    FaqsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
