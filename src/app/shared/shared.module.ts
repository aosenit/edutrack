import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomenavbarComponent } from './homenavbar/homenavbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TableSearchPipe } from './pipes/table-search.pipe';
import { TrustedUrlPipe } from './pipes/trusted-url.pipe';
import { NoRecordComponent } from './no-record/no-record.component';
import { TrustedHtmlPipe } from './pipes/trusted-html.pipe';



@NgModule({
  declarations: [
    HomenavbarComponent,
    FooterComponent,
    LoaderComponent,
    NotificationsComponent,
    TableSearchPipe,
    TrustedUrlPipe,
    NoRecordComponent,
    TrustedHtmlPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomenavbarComponent,
    FooterComponent,
    NotificationsComponent,
    NoRecordComponent,
    LoaderComponent,
    TableSearchPipe,
    TrustedUrlPipe,
    TrustedHtmlPipe
  ]
})
export class SharedModule { }
