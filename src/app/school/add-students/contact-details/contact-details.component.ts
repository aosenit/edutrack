import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AddStudentsComponent } from '../add-students.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { countries } from '../../../../services/utils/country.json';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contactDetailsForm: FormGroup;
  countries: any = countries;
  states: any[];



  constructor(private home: AddStudentsComponent, private fb: FormBuilder) { }

  ngOnInit() {
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
    sessionStorage.setItem('contact-details', JSON.stringify(this.contactDetailsForm.value));
  }

}
