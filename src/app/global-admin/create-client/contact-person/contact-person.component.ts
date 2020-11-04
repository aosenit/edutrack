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
      ContactPhoneNo: ['', [Validators.required]],
      ContactEmail: ['', [Validators.email, Validators.required]]
    });
  }



  nextStep() {
    this.home.stepper(4);
    sessionStorage.setItem('contact-person', JSON.stringify(this.contactPersonForm.value));

  }


}
