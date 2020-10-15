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
      country : ['', Validators.required],
      address: ['', Validators.required],
      state: [''],
      city: ['']
    });
  }

  nextStep() {
    this.home.stepper(3);
    console.log('form data', this.schooldetailsForm.value);
    sessionStorage.setItem('school-details', JSON.stringify(this.schooldetailsForm.value));

  }

  getState(event) {
  for (const unit in countries) {
      if (event === countries[unit].country) {
        const state = countries[unit].states;
        this.states = state;
      }
    }

  }
}
