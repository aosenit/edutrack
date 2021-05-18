import { Component, OnInit } from '@angular/core';
import { CreateClientComponent } from '../create-client.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { countries } from '../../../../services/utils/country.json';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  countries: any = countries;
  states: any[];
  currentStep: any;
  step: any;
  schoolDetails: any;
  id: any;

  schooldetailsForm: FormGroup;
  constructor( private home: CreateClientComponent,
               private fb: FormBuilder,
               private route: ActivatedRoute) { }

    ngOnInit() {
      this.id = this.route.snapshot.params.id;
      // console.log('page id', this.id);
      this.populateSchoolDetails();
      this.route.params.subscribe((param: Params) => {
        if (!param.id) {
          this.populateSchoolDetails();
        } else {
          this.getProfileInformation();
        }
      });
      this.getAActiveTab();
  }

  populateSchoolDetails() {
    this.schooldetailsForm = this.fb.group({
      Country : ['', Validators.required],
      Address: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required]
    });
  }
  nextStep() {
    this.home.stepper(3);
    sessionStorage.setItem('school-details', JSON.stringify(this.schooldetailsForm.value));

  }

  prevStep() {
    this.home.stepper(1);
    this.currentStep = document.getElementById('step-' + `${1 + 1}`);
    console.log('previos step ', this.currentStep);
    this.currentStep.classList.remove('active');

}

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
    for (const unit in countries) {
      if (payload.country === countries[unit].country) {
        const state = countries[unit].states;
        this.states = state;
      }
    }
    this.schooldetailsForm.patchValue({
          Country: payload.country,
          Address: payload.address,
          State: payload.state,
          City: payload.city
        });
  }


  getAActiveTab() {
    this.schoolDetails = JSON.parse( sessionStorage.getItem('school-details'));

    if (sessionStorage.getItem('school-details') !== null) {
      console.log(`School details exists`);
      
      this.schooldetailsForm.patchValue({
        Country: this.schoolDetails.Country,
        Address: this.schoolDetails.Address,
        State: this.schoolDetails.State,
        City: this.schoolDetails.City
      });
    } else {
      console.log(`School details not found`);
    }

  }
}
