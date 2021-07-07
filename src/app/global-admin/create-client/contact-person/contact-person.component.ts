import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CreateClientComponent } from '../create-client.component';

@Component({
  selector: 'app-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.css']
})
export class ContactPersonComponent implements OnInit {

  contactPersonForm: FormGroup;
  currentStep: any;
  step: any;
  contactPerson: any;

  constructor(
              private fb: FormBuilder,
              private home: CreateClientComponent,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.populateContactPerson();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateContactPerson();
      } else {
        this.getProfileInformation();
      }
    });

    this.getAActiveTab();
  }

  populateContactPerson() {
    this.contactPersonForm = this.fb.group({
      ContactFirstName : ['', Validators.required],
      ContactLastName: ['', Validators.required],
      ContactPhoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{0,11}$')]],
      ContactEmail: ['', [Validators.email, Validators.required]]
    });
  }


  nextStep() {
    this.home.stepper(4);
    sessionStorage.setItem('contact-person', JSON.stringify(this.contactPersonForm.value));

  }

  prevStep() {
    this.home.stepper(2);
    this.currentStep = document.getElementById('step-' + `${2 + 1}`);
    this.currentStep.classList.remove('active');
  }

  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('client-info'));
    this.contactPersonForm.patchValue({
          ContactFirstName: payload.contactFirstName,
          ContactLastName: payload.contactLastName,
          ContactPhoneNo: payload.contactPhone,
          ContactEmail: payload.contactEmail
        });
  }


  getAActiveTab() {
    this.contactPerson = JSON.parse( sessionStorage.getItem('contact-person'));

    if (sessionStorage.getItem('contact-person') !== null) {
      // // (`School person exists`);
      this.contactPersonForm.patchValue({
        ContactFirstName: this.contactPerson.ContactFirstName,
        ContactLastName: this.contactPerson.ContactLastName,
        ContactPhoneNo: this.contactPerson.ContactPhoneNo,
        ContactEmail: this.contactPerson.ContactEmail
      });
    } else {
    }

  }

}
