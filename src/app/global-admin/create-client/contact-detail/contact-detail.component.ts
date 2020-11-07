import { Component, OnInit } from '@angular/core';
import { CreateClientComponent } from '../create-client.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { countries } from '../../../../services/utils/country.json';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  countries: any = countries;
  states: any[];
  schooldetailsForm: FormGroup;
  constructor( private home: CreateClientComponent, private fb: FormBuilder) { }

    ngOnInit() {
    this.schooldetailsForm = this.fb.group({
      Country : ['', Validators.required],
      Address: ['', Validators.required],
      State: [''],
      City: ['']
    });
    this.getProfileInformation();
  }

  nextStep() {
    this.home.stepper(3);
    sessionStorage.setItem('school-details', JSON.stringify(this.schooldetailsForm.value));

  }

  // prevStep() {
  //   this.home.stepper(1);
  // }

  getState(event) {
  for (const unit in countries) {
      if (event === countries[unit].country) {
        const state = countries[unit].states;
        this.states = state;
      }
    }

  }

  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('client-info'));
    this.populateProfileForm(payload);
  }

  populateProfileForm(payload: any) {
    this.schooldetailsForm = this.fb.group({
      Country: payload.country,
      Address: payload.address,
      State: payload.state,
      City: payload.city
    });
  }
}
