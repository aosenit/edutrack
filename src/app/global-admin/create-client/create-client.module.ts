import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateClientRoutingModule } from './create-client-routing.module';
import { CreateClientComponent } from './create-client.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactPersonComponent } from './contact-person/contact-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MediaComponent } from './media/media.component';


@NgModule({
  declarations: [CreateClientComponent, ProfileInformationComponent, ContactDetailComponent, ContactPersonComponent, MediaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    HttpClientModule,
    CreateClientRoutingModule
  ]
})
export class CreateClientModule { }
