import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { countries } from '../../../../services/utils/country.json';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  countries: any = countries;
  states: any[];
  @Output() sendChildName = new EventEmitter<string>();

  contactForm: FormGroup;

  constructor(private home: EmployeeComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.sendChildName.emit('Contact Details');
    this.populateContactDetailsForm();

  }

  nextStep() {
    this.home.stepper(4);
    sessionStorage.setItem('employee-contact-details', JSON.stringify(this.contactForm.value));
  }

  getState(event) {
    for (const unit in countries) {
        if (event === countries[unit].country) {
          const state = countries[unit].states;
          this.states = state;
        }
      }

  }

  populateContactDetailsForm() {
    this.contactForm = this.fb.group({
      contactPhone: ['', Validators.required],
      contactAltPhone: ['', Validators.required],
      contactEmail: ['', Validators.required],
      contactAltEmail: ['', Validators.required],
      country: [''],
      Address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

}
