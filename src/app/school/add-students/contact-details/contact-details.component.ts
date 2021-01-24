import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AddStudentsComponent } from '../add-students.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { countries } from '../../../../services/utils/country.json';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contactDetailsForm: FormGroup;
  countries: any = countries;
  states: any[];
  currentStep: any;
  step: any;
  contactDetails: any;
  studentid: any;




  constructor(private home: AddStudentsComponent, private fb: FormBuilder,
              private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.studentid = this.route.snapshot.params.id;

    this.populateContactDetailsForm();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateContactDetailsForm();
      } else {
        this.getProfileInformation();

      }
    });
    this.getActiveTab();
  }

  populateContactDetailsForm() {
    this.contactDetailsForm = this.fb.group({
      ContactPhone: ['', [Validators.required, Validators.pattern('^([0-9][0-9]*)$')]],
      ContactEmail: ['', [Validators.required, Validators.email]],
      ContactCountry: ['', Validators.required],
      ContactAddress: ['', Validators.required],
      ContactTown: ['', Validators.required],
      ContactState: ['', Validators.required],
    });
  }

  getState(event) {
    for (const unit in countries) {
      if (event === countries[unit].country) {
        const state = countries[unit].states;
        this.states = state;
      }
    }

  }

  nextStep() {
    this.home.stepper(4);
    sessionStorage.setItem('Student-contact-details', JSON.stringify(this.contactDetailsForm.value));
  }

  prevStep() {
    this.home.stepper(2);
    this.currentStep = document.getElementById('step-' + `${2 + 1}`);
    this.currentStep.classList.remove('active');
  }

  getActiveTab() {

    this.contactDetails = JSON.parse( sessionStorage.getItem('Student-contact-details'));

    if (sessionStorage.getItem('Student-contact-details') !== null) {
      console.log(`Student Contact details exists`);
      this.contactDetailsForm.patchValue({
        ContactPhone: this.contactDetails.ContactPhone,
        ContactEmail: this.contactDetails.ContactEmail,
      ContactCountry: this.contactDetails.ContactCountry,
      ContactAddress: this.contactDetails.ContactAddress,
      ContactTown: this.contactDetails.ContactTown,
      ContactState: this.contactDetails.ContactState,
      });
    } else {
      console.log(`School contact details not found`);
    }
  }

  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('all-student-info'));
    console.log('na the paylod', payload);
    this.contactDetailsForm.patchValue({
      ContactPhone: payload.phoneNumber,
      ContactEmail: payload.emailAddress,
    ContactCountry: payload.country,
    ContactAddress: payload.homeAddress,
    ContactTown: payload.city,
    ContactState: payload.state,
    });

  }

}
