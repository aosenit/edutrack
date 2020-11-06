import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomenavbarComponent } from './homenavbar/homenavbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { NotificationsComponent } from './notifications/notifications.component';



@NgModule({
  declarations: [HomenavbarComponent, FooterComponent, LoaderComponent, NotificationsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomenavbarComponent,
    FooterComponent,
    NotificationsComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
