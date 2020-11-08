import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CreateClientComponent } from '../create-client.component';

@Component({
  selector: 'app-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.css']
})
export class ContactPersonComponent implements OnInit {

  contactPersonForm: FormGroup;
  constructor(
              private fb: FormBuilder,
              private home: CreateClientComponent
              ) { }

  ngOnInit() {
    this.contactPersonForm = this.fb.group({
      ContactFirstName : ['', Validators.required],
      ContactLastName: ['', Validators.required],
      ContactPhoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{0,11}$')]],
      ContactEmail: ['', [Validators.email, Validators.required]]
    });
    this.getProfileInformation();
  }



  nextStep() {
    this.home.stepper(4);
    sessionStorage.setItem('contact-person', JSON.stringify(this.contactPersonForm.value));

  }
  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('client-info'));
    this.populateProfileForm(payload);
  }

  populateProfileForm(payload: any) {
    this.contactPersonForm = this.fb.group({
      ContactFirstName: payload.contactFirstName,
      ContactLastName: payload.contactLastName,
      ContactPhoneNo: payload.contactPhoneNo,
      ContactEmail: payload.contactEmail
    });
  }


}
